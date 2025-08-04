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
exports.ErrorResponseDto = exports.ProductCritiqueResponseDto = exports.CritiquePoint = exports.CreateProductCritiqueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductCritiqueDto {
}
exports.CreateProductCritiqueDto = CreateProductCritiqueDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis board object from idea_to_analysis API response',
        example: {
            product_goal: 'Increase Day-7 retention of new users...',
            user_problem_goal: {
                problem: 'Learners struggle to build a consistent daily study habit...',
                user_goal: 'I want an easy, motivating way to practice English...',
            },
            target_segments: [
                'University students (18-24)',
                'Young professionals (25-35)',
            ],
            user_insights_data: [],
            scope: {
                in_scope: [],
                out_scope: [],
                constraints: [],
            },
            success_metrics: [],
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateProductCritiqueDto.prototype, "analysis_board", void 0);
class CritiquePoint {
}
exports.CritiquePoint = CritiquePoint;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên của loại phản biện',
        example: 'Chiến lược: Goal vs. Metrics',
    }),
    __metadata("design:type", String)
], CritiquePoint.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả chi tiết về mâu thuẫn hoặc lỗ hổng logic bạn tìm thấy',
        example: 'Mục tiêu tăng retention 7-day là một chỉ số kết quả...',
    }),
    __metadata("design:type", String)
], CritiquePoint.prototype, "critique", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Câu hỏi sắc bén, khơi gợi tư duy mà người dùng cần phải trả lời',
        example: 'Liệu việc đẩy retention từ 22% lên 35% có thực sự giải quyết được gốc rễ...',
    }),
    __metadata("design:type", String)
], CritiquePoint.prototype, "challenge_question", void 0);
class ProductCritiqueResponseDto {
}
exports.ProductCritiqueResponseDto = ProductCritiqueResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Một đoạn tóm tắt ngắn gọn về mức độ chặt chẽ của bản phán tích và những lĩnh vực cần xem xét kỹ lưỡng nhất',
        example: 'Bảng phân tích cho thấy hướng đi hợp lý nhưng hiện còn thiếu những bằng chứng định lượng chắc chắn, thiếu chỉ số đối trọng và có nguy cơ đánh đồng nhu cầu giữa các phân khúc.',
    }),
    __metadata("design:type", String)
], ProductCritiqueResponseDto.prototype, "overall_summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách các điểm phản biện với câu hỏi thách thức',
        type: [CritiquePoint],
        example: [
            {
                category: 'Chiến lược: Goal vs. Problem',
                critique: 'Mục tiêu sản phẩm là nâng Day-7 retention (chỉ số kinh doanh) chứ chưa trực tiếp cam kết giải bài toán xây thói quen học hằng ngày',
                challenge_question: "Liệu việc tập trung tăng Day-7 retention có thực sự giải quyết được gốc rễ 'khó hình thành thói quen học'?",
            },
        ],
    }),
    __metadata("design:type", Array)
], ProductCritiqueResponseDto.prototype, "critique_points", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Lỗi khi tạo phản hồi',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed error information',
        example: 'Invalid analysis_board format',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=product-critique.dto.js.map