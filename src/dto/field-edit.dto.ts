import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFieldEditDto {
  @ApiProperty({
    description: 'Analysis board data hiện tại (JSON object)',
    example: {
      product_goal: 'Increase user retention',
      user_problem_goal: { problem: 'Low engagement', user_goal: 'Daily usage' },
      target_segments: ['Young professionals']
    },
  })
  @IsNotEmpty()
  analysis_board: any;

  @ApiProperty({
    description: 'Tên field cần được cập nhật',
    example: 'user_problem_goal',
  })
  @IsString()
  @IsNotEmpty()
  field_name: string;

  @ApiProperty({
    description: 'Giá trị mới cho field (JSON object hoặc string)',
    example: {
      problem: 'Users drop off after day 3 due to lack of engagement',
      user_goal: 'Build consistent daily learning habit within first week'
    },
  })
  @IsNotEmpty()
  updated_field: any;
}

export class FieldEditResponseDto {
  @ApiProperty({
    description: 'ID của response từ OpenAI',
    example: 'resp_1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Tên field đã được cập nhật',
    example: 'user_problem_goal',
  })
  field_name: string;

  @ApiProperty({
    description: 'Giá trị field đã được GPT cập nhật',
    example: {
      problem: 'Users struggle to maintain daily learning streaks beyond day 3',
      user_goal: 'Establish consistent daily learning habit within first week'
    },
  })
  updated_value: any;

  @ApiProperty({
    description: 'Raw response từ ChatGPT (optional)',
    example: 'JSON response from GPT...',
  })
  raw_content?: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Thông báo lỗi',
    example: 'Lỗi khi xử lý field edit',
  })
  message: string;

  @ApiProperty({
    description: 'Chi tiết lỗi',
    example: 'Invalid field name format',
  })
  error: string;
}
