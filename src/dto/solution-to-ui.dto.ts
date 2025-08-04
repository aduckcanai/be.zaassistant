import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RiskAnalysisInput {
  @ApiProperty({
    description: 'Vấn đề tiềm ẩn được xác định khi triển khai',
    example: 'Khó khăn trong việc tích hợp với hệ thống hiện tại',
  })
  @IsString()
  @IsNotEmpty()
  risk: string;

  @ApiProperty({
    description: 'Ý tưởng để khắc phục rủi ro trên',
    example: 'Xây dựng API adapter layer để tương thích',
  })
  @IsString()
  @IsNotEmpty()
  mitigation_idea: string;

  @ApiProperty({
    description: 'Vấn đề hoặc sự đánh đổi mới mà ý tưởng khắc phục tạo ra',
    example: 'Tăng độ phức tạp của hệ thống và thời gian phát triển',
  })
  @IsString()
  @IsNotEmpty()
  resulting_tradeoff: string;
}

export class SolutionApproachInput {
  @ApiProperty({
    description: 'Tên phương pháp tiếp cận',
    example: 'The Safe Bet',
  })
  @IsString()
  @IsNotEmpty()
  approach_name: string;

  @ApiProperty({
    description: 'Mô tả chi tiết giải pháp',
    example: 'Triển khai từng bước với các tính năng cốt lõi trước',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Mô tả sự đánh đổi cốt lõi của giải pháp',
    example: 'Đánh đổi tốc độ triển khai để đạt được độ ổn định cao',
  })
  @IsString()
  @IsNotEmpty()
  core_tradeoff: string;

  @ApiProperty({
    description: 'Danh sách các lợi ích chính',
    type: [String],
    example: ['Giảm rủi ro kỹ thuật', 'Dễ dàng bảo trì và mở rộng'],
  })
  @IsArray()
  @IsString({ each: true })
  key_benefits: string[];

  @ApiProperty({
    description: 'Phân tích rủi ro triển khai',
    type: [RiskAnalysisInput],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RiskAnalysisInput)
  implementation_risk_analysis: RiskAnalysisInput[];
}

export class CreateSolutionToUIDto {
  @ApiProperty({
    description: 'Tuyên bố vấn đề',
    example:
      'Làm thế nào để tăng tỷ lệ giữ chân người dùng mới trong 7 ngày đầu từ 38% lên 55%?',
  })
  @IsString()
  @IsNotEmpty()
  problem_statement: string;

  @ApiProperty({
    description:
      'Thông tin chi tiết về phương pháp tiếp cận được chọn (tùy chọn)',
    type: SolutionApproachInput,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SolutionApproachInput)
  selected_approach?: SolutionApproachInput;

  @ApiProperty({
    description: 'Danh sách tất cả các phương pháp tiếp cận có sẵn (tùy chọn)',
    type: [SolutionApproachInput],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SolutionApproachInput)
  all_approaches?: SolutionApproachInput[];
}

export class SolutionToUIResponseDto {
  @ApiProperty({
    description: 'HTML content for the UI implementation',
    example: '<div class="solution-ui">...</div>',
  })
  html_content: string;

  @ApiProperty({
    description: 'Response ID for retrieval',
    example: 'resp_1234567890abcdef',
  })
  response_id: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Lỗi khi tạo giao diện người dùng',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: 'Invalid approach data format',
  })
  error: string;
}
