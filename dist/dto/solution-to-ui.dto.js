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
exports.ErrorResponseDto = exports.SolutionToUIResponseDto = exports.CreateSolutionToUIDto = exports.SolutionApproachInput = exports.RiskAnalysisInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RiskAnalysisInput {
}
exports.RiskAnalysisInput = RiskAnalysisInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vấn đề tiềm ẩn được xác định khi triển khai',
        example: 'Khó khăn trong việc tích hợp với hệ thống hiện tại',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RiskAnalysisInput.prototype, "risk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ý tưởng để khắc phục rủi ro trên',
        example: 'Xây dựng API adapter layer để tương thích',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RiskAnalysisInput.prototype, "mitigation_idea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vấn đề hoặc sự đánh đổi mới mà ý tưởng khắc phục tạo ra',
        example: 'Tăng độ phức tạp của hệ thống và thời gian phát triển',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RiskAnalysisInput.prototype, "resulting_tradeoff", void 0);
class SolutionApproachInput {
}
exports.SolutionApproachInput = SolutionApproachInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phương pháp tiếp cận',
        example: 'The Safe Bet',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolutionApproachInput.prototype, "approach_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả chi tiết giải pháp',
        example: 'Triển khai từng bước với các tính năng cốt lõi trước',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolutionApproachInput.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả sự đánh đổi cốt lõi của giải pháp',
        example: 'Đánh đổi tốc độ triển khai để đạt được độ ổn định cao',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolutionApproachInput.prototype, "core_tradeoff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách các lợi ích chính',
        type: [String],
        example: ['Giảm rủi ro kỹ thuật', 'Dễ dàng bảo trì và mở rộng'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SolutionApproachInput.prototype, "key_benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phân tích rủi ro triển khai',
        type: [RiskAnalysisInput],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RiskAnalysisInput),
    __metadata("design:type", Array)
], SolutionApproachInput.prototype, "implementation_risk_analysis", void 0);
class CreateSolutionToUIDto {
}
exports.CreateSolutionToUIDto = CreateSolutionToUIDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tuyên bố vấn đề',
        example: 'Làm thế nào để tăng tỷ lệ giữ chân người dùng mới trong 7 ngày đầu từ 38% lên 55%?',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSolutionToUIDto.prototype, "problem_statement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông tin chi tiết về phương pháp tiếp cận được chọn (tùy chọn)',
        type: SolutionApproachInput,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SolutionApproachInput),
    __metadata("design:type", SolutionApproachInput)
], CreateSolutionToUIDto.prototype, "selected_approach", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách tất cả các phương pháp tiếp cận có sẵn (tùy chọn)',
        type: [SolutionApproachInput],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SolutionApproachInput),
    __metadata("design:type", Array)
], CreateSolutionToUIDto.prototype, "all_approaches", void 0);
class SolutionToUIResponseDto {
}
exports.SolutionToUIResponseDto = SolutionToUIResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML content for the UI implementation',
        example: '<div class="solution-ui">...</div>',
    }),
    __metadata("design:type", String)
], SolutionToUIResponseDto.prototype, "html_content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Response ID for retrieval',
        example: 'resp_1234567890abcdef',
    }),
    __metadata("design:type", String)
], SolutionToUIResponseDto.prototype, "response_id", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Lỗi khi tạo giao diện người dùng',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed error information',
        example: 'Invalid approach data format',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=solution-to-ui.dto.js.map