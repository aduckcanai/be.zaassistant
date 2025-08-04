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
  AssessmentCenterService,
  AssessmentCenterResult,
} from '../services/assessment-center.service';
import {
  CreateAssessmentCenterDto,
  AssessmentCenterResponseDto,
  ErrorResponseDto,
} from '../dto/assessment-center.dto';

@ApiTags('responses/assessment_center')
@Controller('responses/assessment_center')
export class AssessmentCenterController {
  constructor(
    private readonly assessmentCenterService: AssessmentCenterService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create comprehensive assessment',
    description:
      'Analyze both the idea analysis board and product critique to provide comprehensive assessment with recommendations and risk analysis.',
  })
  @ApiBody({
    type: CreateAssessmentCenterDto,
    description:
      'Combined results from idea_to_analysis and product_critique APIs',
  })
  @ApiResponse({
    status: 201,
    description: 'Assessment created successfully',
    type: AssessmentCenterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Missing required input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Failed to create assessment',
    type: ErrorResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAssessment(
    @Body() request: CreateAssessmentCenterDto,
  ): Promise<any> {
    try {
      const result: AssessmentCenterResult =
        await this.assessmentCenterService.createAssessment(
          request.analysis_board,
          request.product_critique,
        );

      // Return the expected format
      return {
        scores: result.scores,
        overall_score: result.overall_score,
        rationale: result.rationale,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi tạo đánh giá toàn diện',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve assessment by ID',
    description:
      'Retrieve a previously created assessment using its response ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Assessment retrieved successfully',
    type: AssessmentCenterResponseDto,
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
  async retrieveResponse(@Param('id') responseId: string): Promise<any> {
    try {
      const result =
        await this.assessmentCenterService.retrieveResponse(responseId);

      // Return the exact expected format
      return {
        scores: result.scores,
        overall_score: result.overall_score,
        rationale: result.rationale,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy phản hồi đánh giá',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
