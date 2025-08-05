import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

export interface FieldEditResult {
  id: string;
  field_name: string;
  updated_value: any;
  raw_content?: string;
}

@Injectable()
export class FieldEditService {
  private readonly logger = new Logger(FieldEditService.name);
  private openai: OpenAI;

  // Field edit prompt ID
  private readonly promptId =
    'pmpt_6891900364688195ba5b137631ff8cf609deaf0c90a8cf47';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async processFieldEdit(
    analysis_board: any,
    field_name: string,
    updated_field: any,
  ): Promise<FieldEditResult> {
    try {
      this.logger.log(`Processing field edit with ID: ${this.promptId}`);
      this.logger.log(`Updating field: ${field_name}`);

      // Merge the 3 JSON fields into 1 structured input
      const mergedInput = JSON.stringify({
        analysis_board: analysis_board,
        field_name: field_name,
        updated_field: updated_field,
      });

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
                text: mergedInput,
              },
            ],
          },
        ],
        store: true,
      });

      const content = this.extractOutputText(response);
      const parsedData = this.tryParseJSON(content);

      this.logger.log(
        `Field edit processed successfully with ID: ${response.id}`,
      );

      // Extract the updated field value from GPT response
      let updatedValue = null;
      if (parsedData && parsedData[field_name]) {
        updatedValue = parsedData[field_name];
      } else if (parsedData) {
        // If GPT returns the value directly without wrapping in field_name
        updatedValue = parsedData;
      }

      return {
        id: response.id,
        field_name: field_name,
        updated_value: updatedValue,
        raw_content: content,
      };
    } catch (error) {
      this.logger.error('Error in processFieldEdit:', error);
      throw new Error(`Failed to process field edit: ${error.message}`);
    }
  }

  async retrieveResponse(responseId: string): Promise<FieldEditResult> {
    try {
      this.logger.log(`Retrieving field edit response: ${responseId}`);

      const response = await (this.openai as any).responses.retrieve(
        responseId,
      );

      const content = this.extractOutputText(response);
      const parsedData = this.tryParseJSON(content);

      // Since we're retrieving, we don't know the original field_name
      let field_name = 'unknown';
      let updated_value = parsedData;

      // Try to extract field name from the response structure
      if (parsedData && typeof parsedData === 'object') {
        const keys = Object.keys(parsedData);
        if (keys.length === 1) {
          field_name = keys[0];
          updated_value = parsedData[field_name];
        }
      }

      return {
        id: responseId,
        field_name: field_name,
        updated_value: updated_value,
        raw_content: content,
      };
    } catch (error) {
      this.logger.error('Error retrieving field edit response:', error);
      throw new Error(`Failed to retrieve response: ${error.message}`);
    }
  }

  // Helper method to extract text from OpenAI response
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

  // Helper method to try parsing JSON from response
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
