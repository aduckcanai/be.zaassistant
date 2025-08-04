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
  SolutionArchitectService,
  SolutionArchitectResult,
} from '../services/solution-architect.service';
import {
  CreateSolutionArchitectDto,
  SolutionArchitectResponseDto,
  ErrorResponseDto,
} from '../dto/solution-architect.dto';

@ApiTags('responses/solution_architect')
@Controller('responses/solution_architect')
export class SolutionArchitectController {
  constructor(
    private readonly solutionArchitectService: SolutionArchitectService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create solution architect analysis',
    description:
      'Transform analysis board into structured solution architecture with multiple approaches, risk analysis, and recommendations.',
  })
  @ApiBody({
    type: CreateSolutionArchitectDto,
    description: 'Analysis board from idea-to-analysis API',
  })
  @ApiResponse({
    status: 201,
    description: 'Solution architect analysis created successfully',
    type: SolutionArchitectResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid analysis board format',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error - Failed to create solution architect analysis',
    type: ErrorResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSolutionArchitect(
    @Body() request: CreateSolutionArchitectDto,
  ): Promise<any> {
    try {
      const result =
        await this.solutionArchitectService.createSolutionArchitect(
          request.analysis_board,
        );

      // Return the solution architect structure as expected
      return result.solution_architect;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi tạo phân tích giải pháp kiến trúc',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve solution architect analysis by ID',
    description:
      'Retrieve a previously created solution architect analysis using its response ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Solution architect analysis retrieved successfully',
    type: SolutionArchitectResponseDto,
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
        await this.solutionArchitectService.retrieveResponse(responseId);

      // Return the solution architect structure as expected
      return result.solution_architect;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy phản hồi phân tích giải pháp kiến trúc',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
