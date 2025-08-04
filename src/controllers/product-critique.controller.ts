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
  ProductCritiqueService,
  ProductCritiqueResult,
} from '../services/product-critique.service';
import {
  CreateProductCritiqueDto,
  ProductCritiqueResponseDto,
  ErrorResponseDto,
} from '../dto/product-critique.dto';

@ApiTags('responses/product_critique')
@Controller('responses/product_critique')
export class ProductCritiqueController {
  constructor(
    private readonly productCritiqueService: ProductCritiqueService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create product critique analysis',
    description:
      'Analyze an idea analysis board and provide detailed critique with strategic insights and challenge questions.',
  })
  @ApiBody({
    type: CreateProductCritiqueDto,
    description:
      'JSON string containing analysis_board from idea_to_analysis API',
  })
  @ApiResponse({
    status: 201,
    description: 'Product critique created successfully',
    type: ProductCritiqueResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input JSON',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Failed to create product critique',
    type: ErrorResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProductCritique(
    @Body() request: CreateProductCritiqueDto,
  ): Promise<any> {
    try {
      const result = await this.productCritiqueService.createProductCritique(
        request.analysis_board,
      );

      // Return only the clean format expected
      return {
        overall_summary: result.overall_summary,
        critique_points: result.critique_points,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi tạo phân tích critique sản phẩm',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve product critique by ID',
    description:
      'Retrieve a previously created product critique using its response ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Product critique retrieved successfully',
    type: ProductCritiqueResponseDto,
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
        await this.productCritiqueService.retrieveResponse(responseId);

      // Return only the clean format expected
      return {
        overall_summary: result.overall_summary,
        critique_points: result.critique_points,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy phản hồi critique',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
