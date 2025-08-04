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
exports.AssessmentCenterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assessment_center_service_1 = require("../services/assessment-center.service");
const assessment_center_dto_1 = require("../dto/assessment-center.dto");
let AssessmentCenterController = class AssessmentCenterController {
    constructor(assessmentCenterService) {
        this.assessmentCenterService = assessmentCenterService;
    }
    async createAssessment(request) {
        try {
            const result = await this.assessmentCenterService.createAssessment(request.analysis_board, request.product_critique);
            return {
                scores: result.scores,
                overall_score: result.overall_score,
                rationale: result.rationale,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi tạo đánh giá toàn diện',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async retrieveResponse(responseId) {
        try {
            const result = await this.assessmentCenterService.retrieveResponse(responseId);
            return {
                scores: result.scores,
                overall_score: result.overall_score,
                rationale: result.rationale,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy phản hồi đánh giá',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AssessmentCenterController = AssessmentCenterController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create comprehensive assessment',
        description: 'Analyze both the idea analysis board and product critique to provide comprehensive assessment with recommendations and risk analysis.',
    }),
    (0, swagger_1.ApiBody)({
        type: assessment_center_dto_1.CreateAssessmentCenterDto,
        description: 'Combined results from idea_to_analysis and product_critique APIs',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Assessment created successfully',
        type: assessment_center_dto_1.AssessmentCenterResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Missing required input data',
        type: assessment_center_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to create assessment',
        type: assessment_center_dto_1.ErrorResponseDto,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assessment_center_dto_1.CreateAssessmentCenterDto]),
    __metadata("design:returntype", Promise)
], AssessmentCenterController.prototype, "createAssessment", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve assessment by ID',
        description: 'Retrieve a previously created assessment using its response ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Assessment retrieved successfully',
        type: assessment_center_dto_1.AssessmentCenterResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Response not found',
        type: assessment_center_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to retrieve response',
        type: assessment_center_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssessmentCenterController.prototype, "retrieveResponse", null);
exports.AssessmentCenterController = AssessmentCenterController = __decorate([
    (0, swagger_1.ApiTags)('responses/assessment_center'),
    (0, common_1.Controller)('responses/assessment_center'),
    __metadata("design:paramtypes", [assessment_center_service_1.AssessmentCenterService])
], AssessmentCenterController);
//# sourceMappingURL=assessment-center.controller.js.map