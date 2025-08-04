import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

export interface ProductCritiqueResult {
  id: string;
  text: string;
  overall_summary: string;
  critique_points: any[];
  raw_json?: any;
}

@Injectable()
export class ProductCritiqueService {
  private readonly logger = new Logger(ProductCritiqueService.name);
  private openai: OpenAI;

  // Product critique prompt ID
  private readonly promptId =
    'pmpt_6889d904d70c81968dbff68a53526cd80221a20f1953bfb7';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createProductCritique(
    analysisBoard: any,
  ): Promise<ProductCritiqueResult> {
    try {
      // Validate that analysis_board exists and has required structure
      if (!analysisBoard || !analysisBoard.product_goal) {
        throw new Error(
          'Invalid analysis_board structure - missing product_goal',
        );
      }

      this.logger.log('Creating product critique for analysis board');

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
                text: JSON.stringify(
                  { analysis_board: analysisBoard },
                  null,
                  2,
                ),
              },
            ],
          },
        ],
        store: true,
      });

      const content = this.extractOutputText(response);
      const parsed = this.tryParseJSON(content);

      this.logger.log(
        `Product critique created successfully with ID: ${response.id}`,
      );

      // Return structured result
      if (parsed && parsed.overall_summary && parsed.critique_points) {
        return {
          id: response.id,
          text: content,
          overall_summary: parsed.overall_summary,
          critique_points: parsed.critique_points,
          raw_json: parsed,
        };
      } else {
        // If parsing failed, return the raw content
        return {
          id: response.id,
          text: content,
          overall_summary: content,
          critique_points: [],
        };
      }
    } catch (error) {
      this.logger.error('Error in createProductCritique:', error);
      throw new Error(`Failed to create product critique: ${error.message}`);
    }
  }

  async retrieveResponse(responseId: string): Promise<ProductCritiqueResult> {
    try {
      this.logger.log(`Retrieving product critique response: ${responseId}`);

      const response = await (this.openai as any).responses.retrieve(
        responseId,
      );

      const content = this.extractOutputText(response);
      const parsed = this.tryParseJSON(content);

      if (parsed && parsed.overall_summary && parsed.critique_points) {
        return {
          id: responseId,
          text: content,
          overall_summary: parsed.overall_summary,
          critique_points: parsed.critique_points,
          raw_json: parsed,
        };
      } else {
        return {
          id: responseId,
          text: content,
          overall_summary: content,
          critique_points: [],
        };
      }
    } catch (error) {
      this.logger.error('Error retrieving product critique response:', error);
      throw new Error(`Failed to retrieve response: ${error.message}`);
    }
  }

  // Copy the same helper methods from responses.service.ts
  private extractOutputText(response: any): string {
    // 1) Responses API explicitly returns output_text for convenience
    if (response.output_text) {
      return response.output_text;
    }

    // 2) Try to find first output_text item inside output array
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

    // 3) Fallback: look for message->content->text path (chat completion simulation case)
    if (response.choices && response.choices.length > 0) {
      const choice = response.choices[0];
      if (choice.message && Array.isArray(choice.message.content)) {
        const first = choice.message.content.find((c: any) => c.text);
        if (first) return first.text;
      }
    }

    return 'Không thể tạo phản hồi.';
  }

  private tryParseJSON(jsonString: string): any {
    const cleaned = jsonString.replace(/```json|```/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch (e1) {
      this.logger.warn(`Failed to parse JSON: ${e1.message}`);
      return null;
    }
  }
}
