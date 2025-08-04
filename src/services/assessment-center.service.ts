import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

export interface AssessmentCenterResult {
  id: string;
  text: string;
  scores: {
    strategic_alignment: number;
    authenticity_and_evidence: number;
    clarity_and_specificity: number;
    risk_awareness: number;
  };
  overall_score: number;
  rationale: {
    strategic_alignment: string;
    authenticity_and_evidence: string;
    clarity_and_specificity: string;
    risk_awareness: string;
  };
  raw_json?: any;
}

@Injectable()
export class AssessmentCenterService {
  private readonly logger = new Logger(AssessmentCenterService.name);
  private openai: OpenAI;

  // Assessment center prompt ID - cần thay bằng prompt ID thực tế
  private readonly promptId =
    'pmpt_6890dcd98cf88194aa429002f0f3e5a9077d078e582ae889';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createAssessment(
    analysisBoard: any,
    productCritique: any,
  ): Promise<AssessmentCenterResult> {
    try {
      // Validate input
      if (!analysisBoard || !productCritique) {
        throw new Error(
          'Both analysis_board and product_critique are required',
        );
      }

      this.logger.log('Creating comprehensive assessment');

      // Prepare input data for the Clarity Score Assessor
      const inputData = {
        analysis_board: analysisBoard,
        critique_points: productCritique.critique_points || [],
      };

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
                text: JSON.stringify(inputData, null, 2),
              },
            ],
          },
        ],
        store: true,
      });

      const content = this.extractOutputText(response);

      // Parse JSON response directly
      const parsed = this.tryParseJSON(content);

      this.logger.log(
        `Assessment created successfully with ID: ${response.id}`,
      );

      if (parsed && this.isValidAssessmentResponse(parsed)) {
        return {
          id: response.id,
          text: content,
          scores: parsed.scores,
          overall_score: parsed.overall_score,
          rationale: parsed.rationale,
          raw_json: parsed,
        };
      } else {
        // If parsing failed, return fallback structure
        return {
          id: response.id,
          text: content,
          scores: {
            strategic_alignment: 50,
            authenticity_and_evidence: 50,
            clarity_and_specificity: 50,
            risk_awareness: 50,
          },
          overall_score: 50,
          rationale: {
            strategic_alignment: 'Unable to parse assessment',
            authenticity_and_evidence: 'Unable to parse assessment',
            clarity_and_specificity: 'Unable to parse assessment',
            risk_awareness: 'Unable to parse assessment',
          },
          raw_json: { error: 'Failed to parse JSON', raw_text: content },
        };
      }
    } catch (error) {
      this.logger.error('Error in createAssessment:', error);
      throw new Error(`Failed to create assessment: ${error.message}`);
    }
  }

  async retrieveResponse(responseId: string): Promise<AssessmentCenterResult> {
    try {
      this.logger.log(`Retrieving assessment response: ${responseId}`);

      const response = await (this.openai as any).responses.retrieve(
        responseId,
      );

      const content = this.extractOutputText(response);
      const parsedResult = this.parseTextAssessment(content);

      return {
        id: responseId,
        text: content,
        scores: parsedResult.scores,
        overall_score: parsedResult.overall_score,
        rationale: parsedResult.rationale,
        raw_json: parsedResult,
      };
    } catch (error) {
      this.logger.error('Error retrieving assessment response:', error);
      throw new Error(`Failed to retrieve response: ${error.message}`);
    }
  }

  private parseTextAssessment(text: string): {
    scores: {
      strategic_alignment: number;
      authenticity_and_evidence: number;
      clarity_and_specificity: number;
      risk_awareness: number;
    };
    overall_score: number;
    rationale: {
      strategic_alignment: string;
      authenticity_and_evidence: string;
      clarity_and_specificity: string;
      risk_awareness: string;
    };
  } {
    try {
      // Extract scores using regex
      const strategicMatch = text.match(
        /Strategic Alignment:\s*(\d+)\s*\/\s*100/i,
      );
      const evidenceMatch = text.match(
        /Evidence Authenticity & Support:\s*(\d+)\s*\/\s*100/i,
      );
      const clarityMatch = text.match(
        /Clarity & Specificity:\s*(\d+)\s*\/\s*100/i,
      );
      const riskMatch = text.match(/Risk Awareness:\s*(\d+)\s*\/\s*100/i);

      // Extract overall score
      const overallMatch =
        text.match(/(?:Rounded\s+)?overall_score:\s*(\d+)(?:\s*\/\s*100)?/i) ||
        text.match(/Overall Score.*?=.*?(\d+(?:\.\d+)?)/i);

      // Extract rationale sections
      const strategicRationale = this.extractRationale(
        text,
        'Strategic Alignment',
        'Evidence Authenticity',
      );
      const evidenceRationale = this.extractRationale(
        text,
        'Evidence Authenticity',
        'Clarity & Specificity',
      );
      const clarityRationale = this.extractRationale(
        text,
        'Clarity & Specificity',
        'Risk Awareness',
      );
      const riskRationale = this.extractRationale(
        text,
        'Risk Awareness',
        'Overall Score',
      );

      return {
        scores: {
          strategic_alignment: strategicMatch
            ? parseInt(strategicMatch[1])
            : 50,
          authenticity_and_evidence: evidenceMatch
            ? parseInt(evidenceMatch[1])
            : 50,
          clarity_and_specificity: clarityMatch
            ? parseInt(clarityMatch[1])
            : 50,
          risk_awareness: riskMatch ? parseInt(riskMatch[1]) : 50,
        },
        overall_score: overallMatch ? parseFloat(overallMatch[1]) : 50,
        rationale: {
          strategic_alignment:
            strategicRationale || 'No detailed rationale available',
          authenticity_and_evidence:
            evidenceRationale || 'No detailed rationale available',
          clarity_and_specificity:
            clarityRationale || 'No detailed rationale available',
          risk_awareness: riskRationale || 'No detailed rationale available',
        },
      };
    } catch (error) {
      this.logger.warn('Failed to parse text assessment:', error);
      return {
        scores: {
          strategic_alignment: 50,
          authenticity_and_evidence: 50,
          clarity_and_specificity: 50,
          risk_awareness: 50,
        },
        overall_score: 50,
        rationale: {
          strategic_alignment: 'Failed to parse rationale',
          authenticity_and_evidence: 'Failed to parse rationale',
          clarity_and_specificity: 'Failed to parse rationale',
          risk_awareness: 'Failed to parse rationale',
        },
      };
    }
  }

  private extractRationale(
    text: string,
    startSection: string,
    endSection: string,
  ): string {
    try {
      const startRegex = new RegExp(
        `${startSection}:.*?\\d+\\s*\\/\\s*100\\s*([\\s\\S]*?)(?=${endSection}|$)`,
        'i',
      );
      const match = text.match(startRegex);

      if (match && match[1]) {
        // Clean up the rationale text
        return match[1]
          .trim()
          .replace(/^\s*[-–—]\s*/gm, '−') // Normalize dashes
          .replace(/\s+/g, ' ') // Normalize whitespace
          .replace(/^\s*\n+|\n+\s*$/g, '') // Remove leading/trailing newlines
          .trim();
      }

      return '';
    } catch (error) {
      this.logger.warn(
        `Failed to extract rationale for ${startSection}:`,
        error,
      );
      return '';
    }
  }

  private isValidAssessmentResponse(parsed: any): boolean {
    return (
      parsed &&
      parsed.scores &&
      typeof parsed.scores.strategic_alignment === 'number' &&
      typeof parsed.scores.authenticity_and_evidence === 'number' &&
      typeof parsed.scores.clarity_and_specificity === 'number' &&
      typeof parsed.scores.risk_awareness === 'number' &&
      typeof parsed.overall_score === 'number' &&
      parsed.rationale &&
      typeof parsed.rationale.strategic_alignment === 'string' &&
      typeof parsed.rationale.authenticity_and_evidence === 'string' &&
      typeof parsed.rationale.clarity_and_specificity === 'string' &&
      typeof parsed.rationale.risk_awareness === 'string'
    );
  }

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
