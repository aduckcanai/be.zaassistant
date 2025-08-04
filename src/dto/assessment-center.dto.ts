import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty } from 'class-validator';

export class CreateAssessmentCenterDto {
  @ApiProperty({
    description: 'Analysis board result from idea_to_analysis API',
    example: {
      product_goal: 'Increase Day-7 retention of new users...',
      user_problem_goal: {
        problem: 'Learners struggle...',
        user_goal: 'I want an easy way...',
      },
      target_segments: ['University students', 'Young professionals'],
      user_insights_data: [],
      scope: { in_scope: [], out_scope: [], constraints: [] },
      success_metrics: [],
    },
  })
  @IsObject()
  @IsNotEmpty()
  analysis_board: any;

  @ApiProperty({
    description: 'Product critique result from product_critique API',
    example: {
      overall_summary: 'Bảng phân tích có cấu trúc rõ ràng nhưng...',
      critique_points: [
        {
          category: 'Chiến lược: Goal vs. Problem',
          critique: 'Mục tiêu tăng retention...',
          challenge_question: 'Liệu việc đẩy retention...',
        },
      ],
    },
  })
  @IsObject()
  @IsNotEmpty()
  product_critique: any;
}

export class ClarityScores {
  @ApiProperty({
    description: 'Strategic Alignment score (0-100)',
    example: 55,
  })
  strategic_alignment: number;

  @ApiProperty({
    description: 'Authenticity and Evidence score (0-100)',
    example: 70,
  })
  authenticity_and_evidence: number;

  @ApiProperty({
    description: 'Clarity and Specificity score (0-100)',
    example: 90,
  })
  clarity_and_specificity: number;

  @ApiProperty({
    description: 'Risk Awareness score (0-100)',
    example: 75,
  })
  risk_awareness: number;
}

export class ScoreRationale {
  @ApiProperty({
    description: 'Reasoning for Strategic Alignment score',
    example:
      '−25 pts for mismatch between stated problem (habit-building) and chosen goal (Day-7 retention); −20 pts for relying on a single success metric that can be gamed, leaving only 55/100.',
  })
  strategic_alignment: string;

  @ApiProperty({
    description: 'Reasoning for Authenticity and Evidence score',
    example:
      'Overall critique highlights that the only evidence is correlational and externally sourced; −30 pts, remaining 70/100.',
  })
  authenticity_and_evidence: string;

  @ApiProperty({
    description: 'Reasoning for Clarity and Specificity score',
    example:
      'No critique points target clarity; objectives, scope and metric definitions are well-articulated, so score kept high at 90/100.',
  })
  clarity_and_specificity: string;

  @ApiProperty({
    description: 'Reasoning for Risk Awareness score',
    example:
      'Lack of counter-metrics and acknowledgement of metric gaming risk noted; −25 pts, leaving 75/100.',
  })
  risk_awareness: string;
}

export class AssessmentCenterResponseDto {
  @ApiProperty({
    description: 'Breakdown scores for 4 criteria',
    type: ClarityScores,
  })
  scores: ClarityScores;

  @ApiProperty({
    description: 'Weighted overall score',
    example: 69.5,
  })
  overall_score: number;

  @ApiProperty({
    description: 'Detailed rationale for each score',
    type: ScoreRationale,
  })
  rationale: ScoreRationale;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Lỗi khi tạo assessment',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: 'Missing analysis_board or product_critique',
  })
  error: string;
}
