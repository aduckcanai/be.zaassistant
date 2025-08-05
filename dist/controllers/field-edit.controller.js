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
exports.FieldEditController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const field_edit_service_1 = require("../services/field-edit.service");
const field_edit_dto_1 = require("../dto/field-edit.dto");
let FieldEditController = class FieldEditController {
    constructor(fieldEditService) {
        this.fieldEditService = fieldEditService;
    }
    async processFieldEdit(request) {
        try {
            const result = await this.fieldEditService.processFieldEdit(request.analysis_board, request.field_name, request.updated_field);
            return {
                id: result.id,
                field_name: result.field_name,
                updated_value: result.updated_value,
                raw_content: result.raw_content,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi xử lý field edit',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async retrieveResponse(responseId) {
        try {
            const result = await this.fieldEditService.retrieveResponse(responseId);
            return {
                id: result.id,
                field_name: result.field_name,
                updated_value: result.updated_value,
                raw_content: result.raw_content,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy phản hồi field edit',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FieldEditController = FieldEditController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Process field edit for analysis board',
        description: 'Update specific field in analysis board using ChatGPT with specified prompt ID template.',
    }),
    (0, swagger_1.ApiBody)({
        type: field_edit_dto_1.CreateFieldEditDto,
        description: 'Field edit request with analysis_board, field_name, and updated_field',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Field edit processed successfully',
        type: field_edit_dto_1.FieldEditResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input data',
        type: field_edit_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to process field edit',
        type: field_edit_dto_1.ErrorResponseDto,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [field_edit_dto_1.CreateFieldEditDto]),
    __metadata("design:returntype", Promise)
], FieldEditController.prototype, "processFieldEdit", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve field edit response by ID',
        description: 'Retrieve a previously processed field edit response using its response ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Field edit response retrieved successfully',
        type: field_edit_dto_1.FieldEditResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Response not found',
        type: field_edit_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to retrieve response',
        type: field_edit_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FieldEditController.prototype, "retrieveResponse", null);
exports.FieldEditController = FieldEditController = __decorate([
    (0, swagger_1.ApiTags)('field-edit'),
    (0, common_1.Controller)('field-edit'),
    __metadata("design:paramtypes", [field_edit_service_1.FieldEditService])
], FieldEditController);
//# sourceMappingURL=field-edit.controller.js.map