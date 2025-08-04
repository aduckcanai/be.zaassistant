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
exports.IdeaToAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const idea_to_analysis_service_1 = require("../services/idea-to-analysis.service");
const idea_to_analysis_dto_1 = require("../dto/idea-to-analysis.dto");
let IdeaToAnalysisController = class IdeaToAnalysisController {
    constructor(ideaToAnalysisService) {
        this.ideaToAnalysisService = ideaToAnalysisService;
    }
    async createIdeaToAnalysis(request) {
        try {
            const result = await this.ideaToAnalysisService.createIdeaToAnalysis(request.inputData);
            return {
                analysis_board: result.analysis_board,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi tạo phân tích từ ý tưởng',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async retrieveResponse(responseId) {
        try {
            const result = await this.ideaToAnalysisService.retrieveResponse(responseId);
            return {
                analysis_board: result.analysis_board,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy phản hồi phân tích ý tưởng',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.IdeaToAnalysisController = IdeaToAnalysisController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create idea to analysis transformation',
        description: 'Transform an idea into structured analysis board with detailed insights and critique.',
    }),
    (0, swagger_1.ApiBody)({
        type: idea_to_analysis_dto_1.CreateIdeaToAnalysisDto,
        description: 'JSON string containing input data for idea to analysis transformation',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Idea to analysis created successfully',
        type: idea_to_analysis_dto_1.IdeaToAnalysisResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input JSON',
        type: idea_to_analysis_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to create idea to analysis',
        type: idea_to_analysis_dto_1.ErrorResponseDto,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [idea_to_analysis_dto_1.CreateIdeaToAnalysisDto]),
    __metadata("design:returntype", Promise)
], IdeaToAnalysisController.prototype, "createIdeaToAnalysis", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve idea to analysis by ID',
        description: 'Retrieve a previously created idea to analysis using its response ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Idea to analysis retrieved successfully',
        type: idea_to_analysis_dto_1.IdeaToAnalysisResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Response not found',
        type: idea_to_analysis_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to retrieve response',
        type: idea_to_analysis_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdeaToAnalysisController.prototype, "retrieveResponse", null);
exports.IdeaToAnalysisController = IdeaToAnalysisController = __decorate([
    (0, swagger_1.ApiTags)('responses/idea_to_analysis'),
    (0, common_1.Controller)('responses/idea_to_analysis'),
    __metadata("design:paramtypes", [idea_to_analysis_service_1.IdeaToAnalysisService])
], IdeaToAnalysisController);
//# sourceMappingURL=idea-to-analysis.controller.js.map