import { Injectable } from '@nestjs/common';
import { SamplePromptDto } from '../dto/sample-prompts.dto';

@Injectable()
export class SamplePromptsService {
  private readonly samplePrompts: SamplePromptDto[] = [
    {
      id: 'prompt_001',
      title: 'Tính năng Sinh nhật',
      description:
        'Tôi muốn thêm tính năng quản lý thông báo Sinh nhật trên Zalo',
    },
    {
      id: 'prompt_002',
      title: 'Tính năng Dịch tự động',
      description:
        'Tính năng Dịch tự động giúp giao tiếp đa ngôn ngữ tiếng Anh, Trung, Hàn một cách thuận tiện, ít thao tác',
    },
    {
      id: 'prompt_003',
      title: 'Tính năng tóm tắt AI',
      description:
        'Sử dụng AI để tóm tắt tin nhắn trong hội nhóm, giúp nắm bắt nội dung nhanh chóng, hiệu quả',
    },
  ];

  getAllPrompts(): { prompts: SamplePromptDto[]; total: number } {
    return {
      prompts: this.samplePrompts,
      total: this.samplePrompts.length,
    };
  }
}
