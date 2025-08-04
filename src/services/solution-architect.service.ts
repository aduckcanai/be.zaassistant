import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { AnalysisBoard } from '../dto/idea-to-analysis.dto';

export interface SolutionArchitectResult {
  id: string;
  text: string;
  solution_architect: any;
  raw_json?: any;
}

@Injectable()
export class SolutionArchitectService {
  private readonly logger = new Logger(SolutionArchitectService.name);
  private openai: OpenAI;

  // Solution architect prompt ID - you'll need to create this prompt in OpenAI
  // For now, using a placeholder - replace with actual prompt ID when available
  private readonly promptId =
    'pmpt_6889fdcb19388190a94da7f32b83b0030328d17d342c1545';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createSolutionArchitect(
    analysis_board: AnalysisBoard,
  ): Promise<SolutionArchitectResult> {
    try {
      this.logger.log('Creating solution architect analysis');

      // Convert analysis_board to JSON string for the prompt
      const inputData = JSON.stringify({ analysis_board });

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
        `Solution architect analysis created successfully with ID: ${response.id}`,
      );

      // Return structured result
      if (parsed && (parsed.problem_statement || parsed.solution_analysis)) {
        return {
          id: response.id,
          text: content,
          solution_architect: parsed,
          raw_json: parsed,
        };
      } else {
        // If parsing fails, create fallback structure
        return {
          id: response.id,
          text: content,
          solution_architect: this.createFallbackResponse(analysis_board),
        };
      }
    } catch (error) {
      this.logger.error('Error in createSolutionArchitect:', error);
      throw new Error(
        `Failed to create solution architect analysis: ${error.message}`,
      );
    }
  }

  async retrieveResponse(responseId: string): Promise<SolutionArchitectResult> {
    try {
      this.logger.log(`Retrieving solution architect response: ${responseId}`);

      const response = await (this.openai as any).responses.retrieve(
        responseId,
      );

      const content = this.extractOutputText(response);
      const parsed = this.tryParseJSON(content);

      if (parsed && (parsed.problem_statement || parsed.solution_analysis)) {
        return {
          id: responseId,
          text: content,
          solution_architect: parsed,
          raw_json: parsed,
        };
      } else {
        return {
          id: responseId,
          text: content,
          solution_architect: {
            problem_statement: 'Unable to parse problem statement',
            solution_analysis: [],
            comparison_summary: {
              heuristic_evaluation: [],
              prioritization_matrix: [],
              recommendation: 'Unable to generate recommendation',
            },
          },
        };
      }
    } catch (error) {
      this.logger.error('Error retrieving solution architect response:', error);
      throw new Error(`Failed to retrieve response: ${error.message}`);
    }
  }

  private createFallbackResponse(analysis_board: AnalysisBoard): any {
    return {
      problem_statement: `Làm thế nào để đạt được mục tiêu: ${analysis_board.product_goal}`,
      solution_analysis: [
        {
          approach_name: 'Phương pháp Tiêu chuẩn',
          description:
            'Triển khai giải pháp theo cách truyền thống với các bước được kiểm chứng.',
          core_tradeoff: 'Đánh đổi tốc độ triển khai để đảm bảo độ ổn định',
          key_benefits: [
            'Giảm thiểu rủi ro',
            'Dễ dàng bảo trì',
            'Có thể dự đoán kết quả',
          ],
          implementation_risk_analysis: [
            {
              risk: 'Có thể mất nhiều thời gian hơn dự kiến',
              mitigation_idea: 'Chia nhỏ thành các milestone ngắn hạn',
              resulting_tradeoff: 'Tăng overhead quản lý dự án',
            },
          ],
        },
      ],
      comparison_summary: {
        heuristic_evaluation: [
          {
            approach_name: 'Phương pháp Tiêu chuẩn',
            findings: [
              {
                heuristic: 'Visibility of system status',
                assessment: 'Hỗ trợ tốt - cung cấp feedback rõ ràng',
              },
            ],
          },
        ],
        prioritization_matrix: [
          {
            approach_name: 'Phương pháp Tiêu chuẩn',
            impact_score: 'Medium',
            effort_score: 'Medium',
            confidence_score: 'High',
          },
        ],
        recommendation:
          'Khuyến nghị sử dụng phương pháp tiêu chuẩn do độ tin cậy cao',
      },
    };
  }

  // Helper methods (same as idea-to-analysis service)
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
