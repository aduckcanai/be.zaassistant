import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

export interface IdeaToAnalysisResult {
  id: string;
  text: string;
  analysis_board: any;
  raw_json?: any;
}

@Injectable()
export class IdeaToAnalysisService {
  private readonly logger = new Logger(IdeaToAnalysisService.name);
  private openai: OpenAI;

  // Idea to analysis prompt ID
  private readonly promptId =
    'pmpt_6890dd194264819782d7f68544c1b02d056516a20bac7bb6';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createIdeaToAnalysis(inputData: string): Promise<IdeaToAnalysisResult> {
    try {
      // Parse the JSON string to validate it
      let parsedInputData;
      try {
        parsedInputData = JSON.parse(inputData);
      } catch (parseError) {
        throw new Error(`Invalid JSON format: ${parseError.message}`);
      }

      this.logger.log('Creating idea to analysis transformation');

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
      const parsed = this.tryParseJSON(content);

      this.logger.log(
        `Idea to analysis created successfully with ID: ${response.id}`,
      );

      // Return structured result with analysis_board
      if (parsed && parsed.analysis_board) {
        return {
          id: response.id,
          text: content,
          analysis_board: parsed.analysis_board,
          raw_json: parsed,
        };
      } else {
        // If no analysis_board found, create fallback structure
        return {
          id: response.id,
          text: content,
          analysis_board: {
            product_goal: 'Unable to parse structured goal',
            user_problem_goal: {
              problem: 'Unable to parse problem',
              user_goal: 'Unable to parse user goal',
            },
            target_segments: [],
            user_insights_data: [],
            scope: {
              in_scope: [],
              out_scope: [],
              constraints: [],
            },
            success_metrics: [],
          },
        };
      }
    } catch (error) {
      this.logger.error('Error in createIdeaToAnalysis:', error);
      throw new Error(`Failed to create idea to analysis: ${error.message}`);
    }
  }

  async retrieveResponse(responseId: string): Promise<IdeaToAnalysisResult> {
    try {
      this.logger.log(`Retrieving idea to analysis response: ${responseId}`);

      const response = await (this.openai as any).responses.retrieve(
        responseId,
      );

      const content = this.extractOutputText(response);
      const parsed = this.tryParseJSON(content);

      if (parsed && parsed.analysis_board) {
        return {
          id: responseId,
          text: content,
          analysis_board: parsed.analysis_board,
          raw_json: parsed,
        };
      } else {
        return {
          id: responseId,
          text: content,
          analysis_board: {
            product_goal: 'Unable to parse structured goal',
            user_problem_goal: {
              problem: 'Unable to parse problem',
              user_goal: 'Unable to parse user goal',
            },
            target_segments: [],
            user_insights_data: [],
            scope: {
              in_scope: [],
              out_scope: [],
              constraints: [],
            },
            success_metrics: [],
          },
        };
      }
    } catch (error) {
      this.logger.error('Error retrieving idea to analysis response:', error);
      throw new Error(`Failed to retrieve response: ${error.message}`);
    }
  }

  // Helper methods remain the same
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
