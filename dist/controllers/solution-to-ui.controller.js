"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionToUIController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const solution_to_ui_service_1 = require("../services/solution-to-ui.service");
const solution_to_ui_dto_1 = require("../dto/solution-to-ui.dto");
let SolutionToUIController = class SolutionToUIController {
    constructor(solutionToUIService) {
        this.solutionToUIService = solutionToUIService;
    }
    async createSolutionToUI(request) {
        try {
            const result = await this.solutionToUIService.createSolutionToUI(request);
            return {
                html_content: result.html_content,
                response_id: result.id,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi tạo giao diện người dùng từ giải pháp',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async retrieveResponse(responseId) {
        try {
            const result = await this.solutionToUIService.retrieveResponse(responseId);
            return {
                html_content: result.html_content,
                response_id: result.id,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy phản hồi giao diện người dùng',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async previewHTML(responseId) {
        try {
            const result = await this.solutionToUIService.retrieveResponse(responseId);
            return result.html_content;
        }
        catch (error) {
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
    async getMockups(responseId) {
        try {
            const result = await this.solutionToUIService.retrieveResponse(responseId);
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
            }
            catch {
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
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy danh sách mockups',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async previewMockup(responseId, mockupIndex) {
        try {
            const result = await this.solutionToUIService.retrieveResponse(responseId);
            const index = parseInt(mockupIndex, 10);
            try {
                const parsed = JSON.parse(result.text);
                if (parsed.selected_mockups && Array.isArray(parsed.selected_mockups)) {
                    const mockup = parsed.selected_mockups[index];
                    if (mockup && mockup.html_code) {
                        return mockup.html_code
                            .replace(/\\n/g, '\n')
                            .replace(/\\t/g, '\t')
                            .replace(/\\r/g, '\r')
                            .replace(/\\"/g, '"')
                            .replace(/\\'/g, "'")
                            .replace(/\\\\/g, '\\');
                    }
                }
            }
            catch {
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
        }
        catch (error) {
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
};
exports.SolutionToUIController = SolutionToUIController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create solution to UI transformation',
        description: 'Transform solution approach details into HTML user interface implementation.',
    }),
    (0, swagger_1.ApiBody)({
        type: solution_to_ui_dto_1.CreateSolutionToUIDto,
        description: 'Problem statement and selected approach details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Solution to UI created successfully',
        type: solution_to_ui_dto_1.SolutionToUIResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input data',
        type: solution_to_ui_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to create solution to UI',
        type: solution_to_ui_dto_1.ErrorResponseDto,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [solution_to_ui_dto_1.CreateSolutionToUIDto]),
    __metadata("design:returntype", Promise)
], SolutionToUIController.prototype, "createSolutionToUI", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve solution to UI by ID',
        description: 'Retrieve a previously created solution to UI using its response ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Solution to UI retrieved successfully',
        type: solution_to_ui_dto_1.SolutionToUIResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Response not found',
        type: solution_to_ui_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to retrieve response',
        type: solution_to_ui_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SolutionToUIController.prototype, "retrieveResponse", null);
__decorate([
    (0, common_1.Get)(':id/preview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Preview solution to UI as HTML page',
        description: 'Display the generated HTML directly in the browser.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SolutionToUIController.prototype, "previewHTML", null);
__decorate([
    (0, common_1.Get)(':id/mockups'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all available mockups for a solution',
        description: 'Retrieve all mockup options from the solution to UI response.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Mockups retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SolutionToUIController.prototype, "getMockups", null);
__decorate([
    (0, common_1.Get)(':id/preview/:mockupIndex'),
    (0, swagger_1.ApiOperation)({
        summary: 'Preview specific mockup as HTML page',
        description: 'Display a specific mockup by index directly in the browser.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiParam)({
        name: 'mockupIndex',
        description: 'Index of the mockup to preview',
        example: '0',
    }),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('mockupIndex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SolutionToUIController.prototype, "previewMockup", null);
exports.SolutionToUIController = SolutionToUIController = __decorate([
    (0, swagger_1.ApiTags)('responses/solution_to_ui'),
    (0, common_1.Controller)('responses/solution_to_ui'),
    __metadata("design:paramtypes", [solution_to_ui_service_1.SolutionToUIService])
], SolutionToUIController);
//# sourceMappingURL=solution-to-ui.controller.js.map