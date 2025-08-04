import { Injectable } from '@nestjs/common';
import { SamplePromptDto } from '../dto/sample-prompts.dto';

@Injectable()
export class SamplePromptsService {
  private readonly samplePrompts: SamplePromptDto[] = [
    {
      id: 'prompt_001',
      title: 'Cải thiện retention cho app học tiếng Anh',
      description:
        'Người dùng là một Product Owner tại một app học tiếng Anh, họ muốn tìm cách cải thiện việc duy trì học hàng ngày (retention) của người dùng mới trong 7 ngày đầu.',
    },
    {
      id: 'prompt_002',
      title: 'Tối ưu UX cho app e-commerce',
      description:
        'Người dùng là một UX Designer tại một công ty e-commerce, họ cần tối ưu hóa flow mua hàng để giảm tỷ lệ abandon cart từ 65% xuống dưới 40% trong Q2.',
    },
    {
      id: 'prompt_003',
      title: 'Chiến lược marketing cho startup fintech',
      description:
        'Người dùng là Marketing Manager tại một startup fintech mới thành lập, họ cần xây dựng chiến lược marketing để thu hút 10,000 người dùng đầu tiên với ngân sách chỉ 50,000 USD.',
    },
  ];

  getAllPrompts(): { prompts: SamplePromptDto[]; total: number } {
    return {
      prompts: this.samplePrompts,
      total: this.samplePrompts.length,
    };
  }
}
