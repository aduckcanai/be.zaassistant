import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty } from 'class-validator';
import { AnalysisBoard } from './idea-to-analysis.dto';

export class CreateSolutionArchitectDto {
  @ApiProperty({
    description: 'Analysis board from idea-to-analysis API',
    type: AnalysisBoard,
  })
  @IsObject()
  @IsNotEmpty()
  analysis_board: AnalysisBoard;
}

export class RiskAnalysis {
  @ApiProperty({
    description: 'Vấn đề tiềm ẩn được xác định khi triển khai',
    example: 'Khó khăn trong việc tích hợp với hệ thống hiện tại',
  })
  risk: string;

  @ApiProperty({
    description: 'Ý tưởng để khắc phục rủi ro trên',
    example: 'Xây dựng API adapter layer để tương thích',
  })
  mitigation_idea: string;

  @ApiProperty({
    description: 'Vấn đề hoặc sự đánh đổi mới mà ý tưởng khắc phục tạo ra',
    example: 'Tăng độ phức tạp của hệ thống và thời gian phát triển',
  })
  resulting_tradeoff: string;
}

export class SolutionApproach {
  @ApiProperty({
    description: 'Tên phương pháp tiếp cận',
    example: 'The Safe Bet',
  })
  approach_name: string;

  @ApiProperty({
    description: 'Mô tả chi tiết giải pháp',
    example: 'Triển khai từng bước với các tính năng cốt lõi trước',
  })
  description: string;

  @ApiProperty({
    description: 'Mô tả sự đánh đổi cốt lõi của giải pháp',
    example: 'Đánh đổi tốc độ triển khai để đạt được độ ổn định cao',
  })
  core_tradeoff: string;

  @ApiProperty({
    description: 'Danh sách các lợi ích chính',
    type: [String],
    example: ['Giảm rủi ro kỹ thuật', 'Dễ dàng bảo trì và mở rộng'],
  })
  key_benefits: string[];

  @ApiProperty({
    description: 'Phân tích rủi ro triển khai',
    type: [RiskAnalysis],
  })
  implementation_risk_analysis: RiskAnalysis[];
}

export class HeuristicFinding {
  @ApiProperty({
    description: 'Tên nguyên tắc Heuristic',
    example: 'Visibility of system status',
  })
  heuristic: string;

  @ApiProperty({
    description: 'Đánh giá ngắn gọn',
    example: 'Hỗ trợ mạnh - giải pháp cung cấp feedback rõ ràng cho người dùng',
  })
  assessment: string;
}

export class HeuristicEvaluation {
  @ApiProperty({
    description: 'Tên phương pháp tiếp cận',
    example: 'The Safe Bet',
  })
  approach_name: string;

  @ApiProperty({
    description: 'Danh sách đánh giá heuristic',
    type: [HeuristicFinding],
  })
  findings: HeuristicFinding[];
}

export class PrioritizationMatrix {
  @ApiProperty({
    description: 'Tên phương pháp tiếp cận',
    example: 'The Safe Bet',
  })
  approach_name: string;

  @ApiProperty({
    description: 'Điểm tác động',
    example: 'High',
    enum: ['Low', 'Medium', 'High'],
  })
  impact_score: string;

  @ApiProperty({
    description: 'Điểm nỗ lực',
    example: 'Medium',
    enum: ['Low', 'Medium', 'High'],
  })
  effort_score: string;

  @ApiProperty({
    description: 'Điểm tin cậy',
    example: 'High',
    enum: ['Low', 'Medium', 'High'],
  })
  confidence_score: string;
}

export class ComparisonSummary {
  @ApiProperty({
    description: 'Đánh giá heuristic cho các phương pháp',
    type: [HeuristicEvaluation],
  })
  heuristic_evaluation: HeuristicEvaluation[];

  @ApiProperty({
    description: 'Ma trận ưu tiên cho các phương pháp',
    type: [PrioritizationMatrix],
  })
  prioritization_matrix: PrioritizationMatrix[];

  @ApiProperty({
    description: 'Đề xuất rõ ràng dựa trên cả Heuristic và Matrix',
    example:
      'Khuyến nghị triển khai "The Safe Bet" do có tác động cao, nỗ lực vừa phải và độ tin cậy cao',
  })
  recommendation: string;
}

export class SolutionArchitectResponseDto {
  @ApiProperty({
    description: 'Tuyên bố vấn đề',
    example:
      'Làm thế nào để tăng tỷ lệ giữ chân người dùng mới trong 7 ngày đầu từ 38% lên 55%?',
  })
  problem_statement: string;

  @ApiProperty({
    description: 'Phân tích các giải pháp',
    type: [SolutionApproach],
  })
  solution_analysis: SolutionApproach[];

  @ApiProperty({
    description: 'Tóm tắt so sánh các giải pháp',
    type: ComparisonSummary,
  })
  comparison_summary: ComparisonSummary;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Lỗi khi tạo phân tích giải pháp',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: 'Invalid analysis_board format',
  })
  error: string;
}
