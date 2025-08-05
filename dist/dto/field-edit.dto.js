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
exports.ErrorResponseDto = exports.FieldEditResponseDto = exports.CreateFieldEditDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFieldEditDto {
}
exports.CreateFieldEditDto = CreateFieldEditDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis board data hiện tại (JSON object)',
        example: {
            product_goal: 'Increase user retention',
            user_problem_goal: { problem: 'Low engagement', user_goal: 'Daily usage' },
            target_segments: ['Young professionals']
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateFieldEditDto.prototype, "analysis_board", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên field cần được cập nhật',
        example: 'user_problem_goal',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFieldEditDto.prototype, "field_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Giá trị mới cho field (JSON object hoặc string)',
        example: {
            problem: 'Users drop off after day 3 due to lack of engagement',
            user_goal: 'Build consistent daily learning habit within first week'
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateFieldEditDto.prototype, "updated_field", void 0);
class FieldEditResponseDto {
}
exports.FieldEditResponseDto = FieldEditResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID của response từ OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    __metadata("design:type", String)
], FieldEditResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên field đã được cập nhật',
        example: 'user_problem_goal',
    }),
    __metadata("design:type", String)
], FieldEditResponseDto.prototype, "field_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Giá trị field đã được GPT cập nhật',
        example: {
            problem: 'Users struggle to maintain daily learning streaks beyond day 3',
            user_goal: 'Establish consistent daily learning habit within first week'
        },
    }),
    __metadata("design:type", Object)
], FieldEditResponseDto.prototype, "updated_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Raw response từ ChatGPT (optional)',
        example: 'JSON response from GPT...',
    }),
    __metadata("design:type", String)
], FieldEditResponseDto.prototype, "raw_content", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thông báo lỗi',
        example: 'Lỗi khi xử lý field edit',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Chi tiết lỗi',
        example: 'Invalid field name format',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=field-edit.dto.js.map