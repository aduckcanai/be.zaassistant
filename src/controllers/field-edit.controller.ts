import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import {
  FieldEditService,
  FieldEditResult,
} from '../services/field-edit.service';
import {
  CreateFieldEditDto,
  FieldEditResponseDto,
  ErrorResponseDto,
} from '../dto/field-edit.dto';

@ApiTags('field-edit')
@Controller('field-edit')
export class FieldEditController {
  constructor(private readonly fieldEditService: FieldEditService) {}

  @Post()
  @ApiOperation({
    summary: 'Process field edit for analysis board',
    description:
      'Update specific field in analysis board using ChatGPT with specified prompt ID template.',
  })
  @ApiBody({
    type: CreateFieldEditDto,
    description: 'Field edit request with analysis_board, field_name, and updated_field',
  })
  @ApiResponse({
    status: 201,
    description: 'Field edit processed successfully',
    type: FieldEditResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Failed to process field edit',
    type: ErrorResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async processFieldEdit(
    @Body() request: CreateFieldEditDto,
  ): Promise<FieldEditResponseDto> {
    try {
      const result = await this.fieldEditService.processFieldEdit(
        request.analysis_board,
        request.field_name,
        request.updated_field,
      );

      return {
        id: result.id,
        field_name: result.field_name,
        updated_value: result.updated_value,
        raw_content: result.raw_content,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi xử lý field edit',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve field edit response by ID',
    description:
      'Retrieve a previously processed field edit response using its response ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Field edit response retrieved successfully',
    type: FieldEditResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Response not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Failed to retrieve response',
    type: ErrorResponseDto,
  })
  async retrieveResponse(
    @Param('id') responseId: string,
  ): Promise<FieldEditResponseDto> {
    try {
      const result = await this.fieldEditService.retrieveResponse(responseId);

      return {
        id: result.id,
        field_name: result.field_name,
        updated_value: result.updated_value,
        raw_content: result.raw_content,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy phản hồi field edit',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
