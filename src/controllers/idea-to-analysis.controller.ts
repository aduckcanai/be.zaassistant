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
  IdeaToAnalysisService,
  IdeaToAnalysisResult,
} from '../services/idea-to-analysis.service';
import {
  CreateIdeaToAnalysisDto,
  IdeaToAnalysisResponseDto,
  ErrorResponseDto,
} from '../dto/idea-to-analysis.dto';

@ApiTags('responses/idea_to_analysis')
@Controller('responses/idea_to_analysis')
export class IdeaToAnalysisController {
  constructor(private readonly ideaToAnalysisService: IdeaToAnalysisService) {}

  @Post()
  @ApiOperation({
    summary: 'Create idea to analysis transformation',
    description:
      'Transform an idea into structured analysis board with detailed insights and critique.',
  })
  @ApiBody({
    type: CreateIdeaToAnalysisDto,
    description:
      'JSON string containing input data for idea to analysis transformation',
  })
  @ApiResponse({
    status: 201,
    description: 'Idea to analysis created successfully',
    type: IdeaToAnalysisResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input JSON',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Failed to create idea to analysis',
    type: ErrorResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createIdeaToAnalysis(
    @Body() request: CreateIdeaToAnalysisDto,
  ): Promise<IdeaToAnalysisResult> {
    try {
      const result = await this.ideaToAnalysisService.createIdeaToAnalysis(
        request.inputData,
      );

      // Return just the analysis_board structure as expected
      return {
        analysis_board: result.analysis_board,
      } as any;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi tạo phân tích từ ý tưởng',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve idea to analysis by ID',
    description:
      'Retrieve a previously created idea to analysis using its response ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Idea to analysis retrieved successfully',
    type: IdeaToAnalysisResponseDto,
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
  ): Promise<IdeaToAnalysisResult> {
    try {
      const result =
        await this.ideaToAnalysisService.retrieveResponse(responseId);

      // Return just the analysis_board structure as expected
      return {
        analysis_board: result.analysis_board,
      } as any;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy phản hồi phân tích ý tưởng',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
