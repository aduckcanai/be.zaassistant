import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SamplePromptsService } from '../services/sample-prompts.service';
import {
  SamplePromptsResponseDto,
  ErrorResponseDto,
} from '../dto/sample-prompts.dto';

@ApiTags('sample-prompts')
@Controller('sample-prompts')
export class SamplePromptsController {
  constructor(private readonly samplePromptsService: SamplePromptsService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả sample prompts',
    description: 'Trả về danh sách tất cả sample prompts có sẵn.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách thành công',
    type: SamplePromptsResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi server',
    type: ErrorResponseDto,
  })
  async getAllPrompts(): Promise<SamplePromptsResponseDto> {
    try {
      return this.samplePromptsService.getAllPrompts();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy danh sách sample prompts',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
