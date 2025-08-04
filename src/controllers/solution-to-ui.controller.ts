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
  Header,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { SolutionToUIService } from '../services/solution-to-ui.service';
import {
  CreateSolutionToUIDto,
  SolutionToUIResponseDto,
  ErrorResponseDto,
} from '../dto/solution-to-ui.dto';

@ApiTags('responses/solution_to_ui')
@Controller('responses/solution_to_ui')
export class SolutionToUIController {
  constructor(private readonly solutionToUIService: SolutionToUIService) {}

  @Post()
  @ApiOperation({
    summary: 'Create solution to UI transformation',
    description:
      'Transform solution approach details into HTML user interface implementation.',
  })
  @ApiBody({
    type: CreateSolutionToUIDto,
    description: 'Problem statement and selected approach details',
  })
  @ApiResponse({
    status: 201,
    description: 'Solution to UI created successfully',
    type: SolutionToUIResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error - Failed to create solution to UI',
    type: ErrorResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSolutionToUI(
    @Body() request: CreateSolutionToUIDto,
  ): Promise<SolutionToUIResponseDto> {
    try {
      const result = await this.solutionToUIService.createSolutionToUI(request);

      return {
        html_content: result.html_content,
        response_id: result.id,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi tạo giao diện người dùng từ giải pháp',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve solution to UI by ID',
    description:
      'Retrieve a previously created solution to UI using its response ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Solution to UI retrieved successfully',
    type: SolutionToUIResponseDto,
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
  ): Promise<SolutionToUIResponseDto> {
    try {
      const result =
        await this.solutionToUIService.retrieveResponse(responseId);

      return {
        html_content: result.html_content,
        response_id: result.id,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy phản hồi giao diện người dùng',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/preview')
  @ApiOperation({
    summary: 'Preview solution to UI as HTML page',
    description: 'Display the generated HTML directly in the browser.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @Header('Content-Type', 'text/html')
  async previewHTML(@Param('id') responseId: string): Promise<string> {
    try {
      const result =
        await this.solutionToUIService.retrieveResponse(responseId);
      return result.html_content;
    } catch (error) {
      return `
        <html>
          <body>
            <h1>Error</h1>
            <p>Không thể tải giao diện: ${error.message}</p>
          </body>
        </html>
      `;
    }
  }

  @Get(':id/mockups')
  @ApiOperation({
    summary: 'Get all available mockups for a solution',
    description:
      'Retrieve all mockup options from the solution to UI response.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Mockups retrieved successfully',
  })
  async getMockups(@Param('id') responseId: string): Promise<any> {
    try {
      const result =
        await this.solutionToUIService.retrieveResponse(responseId);

      // Parse the original response to get all mockups
      try {
        const parsed = JSON.parse(result.text);
        if (parsed.selected_mockups && Array.isArray(parsed.selected_mockups)) {
          return {
            response_id: responseId,
            mockups: parsed.selected_mockups.map((mockup, index) => ({
              index,
              approach_name: mockup.approach_name,
              preview_url: `/responses/solution_to_ui/${responseId}/preview/${index}`,
            })),
          };
        }
      } catch {
        // Fallback to single mockup
        return {
          response_id: responseId,
          mockups: [
            {
              index: 0,
              approach_name: 'Default Approach',
              preview_url: `/responses/solution_to_ui/${responseId}/preview`,
            },
          ],
        };
      }

      return {
        response_id: responseId,
        mockups: [],
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Lỗi khi lấy danh sách mockups',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/preview/:mockupIndex')
  @ApiOperation({
    summary: 'Preview specific mockup as HTML page',
    description: 'Display a specific mockup by index directly in the browser.',
  })
  @ApiParam({
    name: 'id',
    description: 'Response ID from OpenAI',
    example: 'resp_1234567890abcdef',
  })
  @ApiParam({
    name: 'mockupIndex',
    description: 'Index of the mockup to preview',
    example: '0',
  })
  @Header('Content-Type', 'text/html')
  async previewMockup(
    @Param('id') responseId: string,
    @Param('mockupIndex') mockupIndex: string,
  ): Promise<string> {
    try {
      const result =
        await this.solutionToUIService.retrieveResponse(responseId);
      const index = parseInt(mockupIndex, 10);

      // Parse the original response to get specific mockup
      try {
        const parsed = JSON.parse(result.text);
        if (parsed.selected_mockups && Array.isArray(parsed.selected_mockups)) {
          const mockup = parsed.selected_mockups[index];
          if (mockup && mockup.html_code) {
            // Unescape the HTML content
            return mockup.html_code
              .replace(/\\n/g, '\n')
              .replace(/\\t/g, '\t')
              .replace(/\\r/g, '\r')
              .replace(/\\"/g, '"')
              .replace(/\\'/g, "'")
              .replace(/\\\\/g, '\\');
          }
        }
      } catch {
        // Fallback to default content
        return result.html_content;
      }

      return `
        <html>
          <body>
            <h1>Mockup Not Found</h1>
            <p>Không tìm thấy mockup với index ${index}</p>
          </body>
        </html>
      `;
    } catch (error) {
      return `
        <html>
          <body>
            <h1>Error</h1>
            <p>Không thể tải mockup: ${error.message}</p>
          </body>
        </html>
      `;
    }
  }
}
