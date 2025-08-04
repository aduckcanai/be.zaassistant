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
exports.ErrorResponseDto = exports.SamplePromptsResponseDto = exports.SamplePromptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SamplePromptDto {
}
exports.SamplePromptDto = SamplePromptDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của sample prompt',
        example: 'prompt_001',
    }),
    __metadata("design:type", String)
], SamplePromptDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tiêu đề của sample prompt',
        example: 'Cải thiện retention cho app học tiếng Anh',
    }),
    __metadata("design:type", String)
], SamplePromptDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả ngắn gọn về prompt',
        example: 'Tìm cách tăng tỷ lệ người dùng quay lại trong 7 ngày đầu',
    }),
    __metadata("design:type", String)
], SamplePromptDto.prototype, "description", void 0);
class SamplePromptsResponseDto {
}
exports.SamplePromptsResponseDto = SamplePromptsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách sample prompts',
        type: [SamplePromptDto],
    }),
    __metadata("design:type", Array)
], SamplePromptsResponseDto.prototype, "prompts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số prompts',
        example: 15,
    }),
    __metadata("design:type", Number)
], SamplePromptsResponseDto.prototype, "total", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mã lỗi HTTP',
        example: 500,
    }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông báo lỗi',
        example: 'Internal Server Error',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp khi xảy ra lỗi',
        example: '2024-01-15T10:30:45.123Z',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đường dẫn API gây lỗi',
        example: '/api/sample-prompts',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "path", void 0);
//# sourceMappingURL=sample-prompts.dto.js.map