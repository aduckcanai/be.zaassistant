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
exports.ErrorResponseDto = exports.SolutionArchitectResponseDto = exports.ComparisonSummary = exports.PrioritizationMatrix = exports.HeuristicEvaluation = exports.HeuristicFinding = exports.SolutionApproach = exports.RiskAnalysis = exports.CreateSolutionArchitectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const idea_to_analysis_dto_1 = require("./idea-to-analysis.dto");
class CreateSolutionArchitectDto {
}
exports.CreateSolutionArchitectDto = CreateSolutionArchitectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis board from idea-to-analysis API',
        type: idea_to_analysis_dto_1.AnalysisBoard,
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", idea_to_analysis_dto_1.AnalysisBoard)
], CreateSolutionArchitectDto.prototype, "analysis_board", void 0);
class RiskAnalysis {
}
exports.RiskAnalysis = RiskAnalysis;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vấn đề tiềm ẩn được xác định khi triển khai',
        example: 'Khó khăn trong việc tích hợp với hệ thống hiện tại',
    }),
    __metadata("design:type", String)
], RiskAnalysis.prototype, "risk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ý tưởng để khắc phục rủi ro trên',
        example: 'Xây dựng API adapter layer để tương thích',
    }),
    __metadata("design:type", String)
], RiskAnalysis.prototype, "mitigation_idea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vấn đề hoặc sự đánh đổi mới mà ý tưởng khắc phục tạo ra',
        example: 'Tăng độ phức tạp của hệ thống và thời gian phát triển',
    }),
    __metadata("design:type", String)
], RiskAnalysis.prototype, "resulting_tradeoff", void 0);
class SolutionApproach {
}
exports.SolutionApproach = SolutionApproach;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phương pháp tiếp cận',
        example: 'The Safe Bet',
    }),
    __metadata("design:type", String)
], SolutionApproach.prototype, "approach_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả chi tiết giải pháp',
        example: 'Triển khai từng bước với các tính năng cốt lõi trước',
    }),
    __metadata("design:type", String)
], SolutionApproach.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả sự đánh đổi cốt lõi của giải pháp',
        example: 'Đánh đổi tốc độ triển khai để đạt được độ ổn định cao',
    }),
    __metadata("design:type", String)
], SolutionApproach.prototype, "core_tradeoff", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách các lợi ích chính',
        type: [String],
        example: ['Giảm rủi ro kỹ thuật', 'Dễ dàng bảo trì và mở rộng'],
    }),
    __metadata("design:type", Array)
], SolutionApproach.prototype, "key_benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phân tích rủi ro triển khai',
        type: [RiskAnalysis],
    }),
    __metadata("design:type", Array)
], SolutionApproach.prototype, "implementation_risk_analysis", void 0);
class HeuristicFinding {
}
exports.HeuristicFinding = HeuristicFinding;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên nguyên tắc Heuristic',
        example: 'Visibility of system status',
    }),
    __metadata("design:type", String)
], HeuristicFinding.prototype, "heuristic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh giá ngắn gọn',
        example: 'Hỗ trợ mạnh - giải pháp cung cấp feedback rõ ràng cho người dùng',
    }),
    __metadata("design:type", String)
], HeuristicFinding.prototype, "assessment", void 0);
class HeuristicEvaluation {
}
exports.HeuristicEvaluation = HeuristicEvaluation;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phương pháp tiếp cận',
        example: 'The Safe Bet',
    }),
    __metadata("design:type", String)
], HeuristicEvaluation.prototype, "approach_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Danh sách đánh giá heuristic',
        type: [HeuristicFinding],
    }),
    __metadata("design:type", Array)
], HeuristicEvaluation.prototype, "findings", void 0);
class PrioritizationMatrix {
}
exports.PrioritizationMatrix = PrioritizationMatrix;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phương pháp tiếp cận',
        example: 'The Safe Bet',
    }),
    __metadata("design:type", String)
], PrioritizationMatrix.prototype, "approach_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Điểm tác động',
        example: 'High',
        enum: ['Low', 'Medium', 'High'],
    }),
    __metadata("design:type", String)
], PrioritizationMatrix.prototype, "impact_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Điểm nỗ lực',
        example: 'Medium',
        enum: ['Low', 'Medium', 'High'],
    }),
    __metadata("design:type", String)
], PrioritizationMatrix.prototype, "effort_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Điểm tin cậy',
        example: 'High',
        enum: ['Low', 'Medium', 'High'],
    }),
    __metadata("design:type", String)
], PrioritizationMatrix.prototype, "confidence_score", void 0);
class ComparisonSummary {
}
exports.ComparisonSummary = ComparisonSummary;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh giá heuristic cho các phương pháp',
        type: [HeuristicEvaluation],
    }),
    __metadata("design:type", Array)
], ComparisonSummary.prototype, "heuristic_evaluation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ma trận ưu tiên cho các phương pháp',
        type: [PrioritizationMatrix],
    }),
    __metadata("design:type", Array)
], ComparisonSummary.prototype, "prioritization_matrix", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đề xuất rõ ràng dựa trên cả Heuristic và Matrix',
        example: 'Khuyến nghị triển khai "The Safe Bet" do có tác động cao, nỗ lực vừa phải và độ tin cậy cao',
    }),
    __metadata("design:type", String)
], ComparisonSummary.prototype, "recommendation", void 0);
class SolutionArchitectResponseDto {
}
exports.SolutionArchitectResponseDto = SolutionArchitectResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tuyên bố vấn đề',
        example: 'Làm thế nào để tăng tỷ lệ giữ chân người dùng mới trong 7 ngày đầu từ 38% lên 55%?',
    }),
    __metadata("design:type", String)
], SolutionArchitectResponseDto.prototype, "problem_statement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phân tích các giải pháp',
        type: [SolutionApproach],
    }),
    __metadata("design:type", Array)
], SolutionArchitectResponseDto.prototype, "solution_analysis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tóm tắt so sánh các giải pháp',
        type: ComparisonSummary,
    }),
    __metadata("design:type", ComparisonSummary)
], SolutionArchitectResponseDto.prototype, "comparison_summary", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Lỗi khi tạo phân tích giải pháp',
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
//# sourceMappingURL=solution-architect.dto.js.map