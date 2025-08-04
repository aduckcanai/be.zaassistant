import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty } from 'class-validator';

export class CreateProductCritiqueDto {
  @ApiProperty({
    description: 'Analysis board object from idea_to_analysis API response',
    example: {
      product_goal: 'Increase Day-7 retention of new users...',
      user_problem_goal: {
        problem: 'Learners struggle to build a consistent daily study habit...',
        user_goal: 'I want an easy, motivating way to practice English...',
      },
      target_segments: [
        'University students (18-24)',
        'Young professionals (25-35)',
      ],
      user_insights_data: [],
      scope: {
        in_scope: [],
        out_scope: [],
        constraints: [],
      },
      success_metrics: [],
    },
  })
  @IsObject()
  @IsNotEmpty()
  analysis_board: any;
}

export class CritiquePoint {
  @ApiProperty({
    description: 'Tên của loại phản biện',
    example: 'Chiến lược: Goal vs. Metrics',
  })
  category: string;

  @ApiProperty({
    description: 'Mô tả chi tiết về mâu thuẫn hoặc lỗ hổng logic bạn tìm thấy',
    example: 'Mục tiêu tăng retention 7-day là một chỉ số kết quả...',
  })
  critique: string;

  @ApiProperty({
    description:
      'Câu hỏi sắc bén, khơi gợi tư duy mà người dùng cần phải trả lời',
    example:
      'Liệu việc đẩy retention từ 22% lên 35% có thực sự giải quyết được gốc rễ...',
  })
  challenge_question: string;
}

export class ProductCritiqueResponseDto {
  @ApiProperty({
    description:
      'Một đoạn tóm tắt ngắn gọn về mức độ chặt chẽ của bản phán tích và những lĩnh vực cần xem xét kỹ lưỡng nhất',
    example:
      'Bảng phân tích cho thấy hướng đi hợp lý nhưng hiện còn thiếu những bằng chứng định lượng chắc chắn, thiếu chỉ số đối trọng và có nguy cơ đánh đồng nhu cầu giữa các phân khúc.',
  })
  overall_summary: string;

  @ApiProperty({
    description: 'Danh sách các điểm phản biện với câu hỏi thách thức',
    type: [CritiquePoint],
    example: [
      {
        category: 'Chiến lược: Goal vs. Problem',
        critique:
          'Mục tiêu sản phẩm là nâng Day-7 retention (chỉ số kinh doanh) chứ chưa trực tiếp cam kết giải bài toán xây thói quen học hằng ngày',
        challenge_question:
          "Liệu việc tập trung tăng Day-7 retention có thực sự giải quyết được gốc rễ 'khó hình thành thói quen học'?",
      },
    ],
  })
  critique_points: CritiquePoint[];
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Lỗi khi tạo phản hồi',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: 'Invalid analysis_board format',
  })
  error: string;
}
