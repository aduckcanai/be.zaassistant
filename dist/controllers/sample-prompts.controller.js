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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplePromptsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sample_prompts_service_1 = require("../services/sample-prompts.service");
const sample_prompts_dto_1 = require("../dto/sample-prompts.dto");
let SamplePromptsController = class SamplePromptsController {
    constructor(samplePromptsService) {
        this.samplePromptsService = samplePromptsService;
    }
    async getAllPrompts() {
        try {
            return this.samplePromptsService.getAllPrompts();
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy danh sách sample prompts',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SamplePromptsController = SamplePromptsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lấy danh sách tất cả sample prompts',
        description: 'Trả về danh sách tất cả sample prompts có sẵn.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách thành công',
        type: sample_prompts_dto_1.SamplePromptsResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Lỗi server',
        type: sample_prompts_dto_1.ErrorResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SamplePromptsController.prototype, "getAllPrompts", null);
exports.SamplePromptsController = SamplePromptsController = __decorate([
    (0, swagger_1.ApiTags)('sample-prompts'),
    (0, common_1.Controller)('sample-prompts'),
    __metadata("design:paramtypes", [sample_prompts_service_1.SamplePromptsService])
], SamplePromptsController);
//# sourceMappingURL=sample-prompts.controller.js.map