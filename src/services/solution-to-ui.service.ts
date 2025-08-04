import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateSolutionToUIDto } from '../dto/solution-to-ui.dto';

export interface SolutionToUIResult {
  id: string;
  text: string;
  html_content: string;
  raw_json?: any;
}

@Injectable()
export class SolutionToUIService {
  private readonly logger = new Logger(SolutionToUIService.name);
  private openai: OpenAI;

  // Solution to UI prompt ID - you'll need to create this prompt in OpenAI
  // For now, using a placeholder - replace with actual prompt ID when available
  private readonly promptId =
    'pmpt_6890db9a54208193941adf9b162087f403a9f9615d6562f0';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createSolutionToUI(
    requestData: CreateSolutionToUIDto,
  ): Promise<SolutionToUIResult> {
    try {
      this.logger.log('Creating solution to UI transformation');

      // Convert request data to JSON string for the prompt
      const inputData = JSON.stringify(requestData);

      const response = await (this.openai as any).responses.create({
        prompt: {
          id: this.promptId,
        },
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: inputData,
              },
            ],
          },
        ],
        store: true,
      });

      const content = this.extractOutputText(response);

      // The content from OpenAI should be HTML directly
      // Clean up any markdown formatting if present
      const htmlContent = this.extractHTML(content);

      this.logger.log(
        `Solution to UI created successfully with ID: ${response.id}`,
      );

      return {
        id: response.id,
        text: content,
        html_content: htmlContent,
      };
    } catch (error) {
      this.logger.error('Error in createSolutionToUI:', error);
      throw new Error(`Failed to create solution to UI: ${error.message}`);
    }
  }

  async retrieveResponse(responseId: string): Promise<SolutionToUIResult> {
    try {
      this.logger.log(`Retrieving solution to UI response: ${responseId}`);

      const response = await (this.openai as any).responses.retrieve(
        responseId,
      );

      const content = this.extractOutputText(response);
      const htmlContent = this.extractHTML(content);

      return {
        id: responseId,
        text: content,
        html_content: htmlContent,
      };
    } catch (error) {
      this.logger.error('Error retrieving solution to UI response:', error);
      throw new Error(`Failed to retrieve response: ${error.message}`);
    }
  }

  private extractHTML(content: string): string {
    // First, try to parse as JSON to extract HTML from structured response
    try {
      const parsed = JSON.parse(content);

      // Check for selected_mockups structure
      if (parsed.selected_mockups && Array.isArray(parsed.selected_mockups)) {
        // Extract HTML from the first mockup
        const firstMockup = parsed.selected_mockups[0];
        if (firstMockup && firstMockup.html_code) {
          // Unescape the HTML content
          return this.unescapeHtml(firstMockup.html_code);
        }
      }

      // Check for direct html_content field
      if (parsed.html_content) {
        return this.unescapeHtml(parsed.html_content);
      }

      // If it's a JSON string, return as is for further processing
      if (typeof parsed === 'string') {
        return this.processHtmlString(parsed);
      }
    } catch (parseError) {
      // If JSON parsing fails, treat as raw content
      this.logger.warn(
        `Failed to parse JSON, treating as raw content: ${parseError.message}`,
      );
    }

    // Fallback to original processing for non-JSON content
    return this.processHtmlString(content);
  }

  private processHtmlString(content: string): string {
    // Remove markdown code blocks if present
    let htmlContent = content
      .replace(/```html\s*\n?/gi, '')
      .replace(/```\s*$/g, '')
      .trim();

    // If content doesn't start with HTML tags, assume it's the full HTML
    if (
      !htmlContent.toLowerCase().includes('<html') &&
      !htmlContent.toLowerCase().includes('<!doctype')
    ) {
      // If it's just HTML fragments, wrap it in a basic HTML structure
      if (
        htmlContent.includes('<div') ||
        htmlContent.includes('<p') ||
        htmlContent.includes('<h')
      ) {
        htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solution UI</title>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
      }
    }

    return htmlContent;
  }

  private unescapeHtml(escapedHtml: string): string {
    return escapedHtml
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\');
  }

  // Helper methods (same as other services)
  private extractOutputText(response: any): string {
    if (response.output_text) {
      return response.output_text;
    }

    if (response.output && Array.isArray(response.output)) {
      const textItem = response.output.find(
        (item: any) =>
          item.type === 'message' &&
          item.content &&
          item.content.length > 0 &&
          item.content[0].type === 'output_text',
      );
      if (textItem) {
        return textItem.content[0].text || 'Không thể tạo phản hồi.';
      }
    }

    if (response.choices && response.choices.length > 0) {
      const choice = response.choices[0];
      if (choice.message && Array.isArray(choice.message.content)) {
        const first = choice.message.content.find((c: any) => c.text);
        if (first) return first.text;
      }
    }

    return 'Không thể tạo phản hồi.';
  }
}
