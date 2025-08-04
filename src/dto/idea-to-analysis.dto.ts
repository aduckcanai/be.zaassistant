import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIdeaToAnalysisDto {
  @ApiProperty({
    description:
      'JSON string containing input data for idea to analysis transformation',
    example: '{"idea": "My startup idea", "context": "Market analysis"}',
  })
  @IsString()
  @IsNotEmpty()
  inputData: string;
}

export class UserProblemGoal {
  @ApiProperty({
    description: 'Core problem identified',
    example: 'New learners fail to form a daily study habit in the first week',
  })
  problem: string;

  @ApiProperty({
    description: 'User goal to solve the problem',
    example:
      'Get quick, bite-sized English practice that fits their daily routine',
  })
  user_goal: string;
}

export class UserInsight {
  @ApiProperty({
    description: 'Key insight about user behavior',
    example:
      'Streak mechanics combined with visible progress indicators materially increase first-week habit formation',
  })
  insight: string;

  @ApiProperty({
    description: 'Evidence supporting the insight',
    example:
      'Duolingo reported a 24% uplift in D7 retention after launching streak notifications',
  })
  evidence: string;

  @ApiProperty({
    description: 'Type of source',
    example: 'WEB_SEARCH',
  })
  source_type: string;

  @ApiProperty({
    description: 'Detailed source information',
    example: 'https://blog.duolingo.com/streaks-retention-study-2023',
  })
  source_detail: string;
}

export class ProjectScope {
  @ApiProperty({
    description: 'Items included in project scope',
    type: [String],
    example: ['Revamp onboarding flow', 'Implement daily streak system'],
  })
  in_scope: string[];

  @ApiProperty({
    description: 'Items explicitly excluded from scope',
    type: [String],
    example: ['Rewriting core curriculum', 'Paid acquisition programs'],
  })
  out_scope: string[];

  @ApiProperty({
    description: 'Project constraints',
    type: [String],
    example: ['Mobile team bandwidth: 2 iOS, 2 Android, 1 BE engineer'],
  })
  constraints: string[];
}

export class SuccessMetric {
  @ApiProperty({
    description: 'Metric name',
    example: '7-day new-user retention (D7)',
  })
  name: string;

  @ApiProperty({
    description: 'Metric type',
    example: 'primary',
  })
  type: string;

  @ApiProperty({
    description: 'How the metric is calculated',
    example:
      'Number of users who install on Day 0 and open the app on Day 7 ÷ total installs on Day 0',
  })
  formula: string;

  @ApiProperty({
    description: 'Target value for the metric',
    example: '≥55%',
  })
  target: string;
}

export class AnalysisBoard {
  @ApiProperty({
    description: 'Product goal statement',
    example:
      'By 31 Dec 2024, increase the 7-day new-user retention rate from 38% to at least 55%',
  })
  product_goal: string;

  @ApiProperty({
    description: 'User problem and goal definition',
    type: UserProblemGoal,
  })
  user_problem_goal: UserProblemGoal;

  @ApiProperty({
    description: 'Target user segments',
    type: [String],
    example: [
      'Busy young professionals (22-35)',
      'University students preparing for TOEIC/IELTS',
    ],
  })
  target_segments: string[];

  @ApiProperty({
    description: 'User insights with supporting data',
    type: [UserInsight],
  })
  user_insights_data: UserInsight[];

  @ApiProperty({
    description: 'Project scope definition',
    type: ProjectScope,
  })
  scope: ProjectScope;

  @ApiProperty({
    description: 'Success metrics and targets',
    type: [SuccessMetric],
  })
  success_metrics: SuccessMetric[];
}

export class IdeaToAnalysisResponseDto {
  @ApiProperty({
    description: 'Structured analysis board',
    type: AnalysisBoard,
  })
  analysis_board: AnalysisBoard;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Lỗi khi tạo phản hồi',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: 'Invalid JSON format in inputData',
  })
  error: string;
}
