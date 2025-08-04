import { ApiProperty } from '@nestjs/swagger';

export class SamplePromptDto {
  @ApiProperty({
    description: 'ID của sample prompt',
    example: 'prompt_001',
  })
  id: string;

  @ApiProperty({
    description: 'Tiêu đề của sample prompt',
    example: 'Cải thiện retention cho app học tiếng Anh',
  })
  title: string;

  @ApiProperty({
    description: 'Mô tả ngắn gọn về prompt',
    example: 'Tìm cách tăng tỷ lệ người dùng quay lại trong 7 ngày đầu',
  })
  description: string;
}

export class SamplePromptsResponseDto {
  @ApiProperty({
    description: 'Danh sách sample prompts',
    type: [SamplePromptDto],
  })
  prompts: SamplePromptDto[];

  @ApiProperty({
    description: 'Tổng số prompts',
    example: 15,
  })
  total: number;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Mã lỗi HTTP',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Thông báo lỗi',
    example: 'Internal Server Error',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp khi xảy ra lỗi',
    example: '2024-01-15T10:30:45.123Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Đường dẫn API gây lỗi',
    example: '/api/sample-prompts',
  })
  path: string;
}
