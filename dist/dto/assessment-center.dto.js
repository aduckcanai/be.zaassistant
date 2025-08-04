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
exports.ErrorResponseDto = exports.AssessmentCenterResponseDto = exports.ScoreRationale = exports.ClarityScores = exports.CreateAssessmentCenterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAssessmentCenterDto {
}
exports.CreateAssessmentCenterDto = CreateAssessmentCenterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Analysis board result from idea_to_analysis API',
        example: {
            product_goal: 'Increase Day-7 retention of new users...',
            user_problem_goal: {
                problem: 'Learners struggle...',
                user_goal: 'I want an easy way...',
            },
            target_segments: ['University students', 'Young professionals'],
            user_insights_data: [],
            scope: { in_scope: [], out_scope: [], constraints: [] },
            success_metrics: [],
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateAssessmentCenterDto.prototype, "analysis_board", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product critique result from product_critique API',
        example: {
            overall_summary: 'Bảng phân tích có cấu trúc rõ ràng nhưng...',
            critique_points: [
                {
                    category: 'Chiến lược: Goal vs. Problem',
                    critique: 'Mục tiêu tăng retention...',
                    challenge_question: 'Liệu việc đẩy retention...',
                },
            ],
        },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateAssessmentCenterDto.prototype, "product_critique", void 0);
class ClarityScores {
}
exports.ClarityScores = ClarityScores;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Strategic Alignment score (0-100)',
        example: 55,
    }),
    __metadata("design:type", Number)
], ClarityScores.prototype, "strategic_alignment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Authenticity and Evidence score (0-100)',
        example: 70,
    }),
    __metadata("design:type", Number)
], ClarityScores.prototype, "authenticity_and_evidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clarity and Specificity score (0-100)',
        example: 90,
    }),
    __metadata("design:type", Number)
], ClarityScores.prototype, "clarity_and_specificity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Risk Awareness score (0-100)',
        example: 75,
    }),
    __metadata("design:type", Number)
], ClarityScores.prototype, "risk_awareness", void 0);
class ScoreRationale {
}
exports.ScoreRationale = ScoreRationale;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reasoning for Strategic Alignment score',
        example: '−25 pts for mismatch between stated problem (habit-building) and chosen goal (Day-7 retention); −20 pts for relying on a single success metric that can be gamed, leaving only 55/100.',
    }),
    __metadata("design:type", String)
], ScoreRationale.prototype, "strategic_alignment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reasoning for Authenticity and Evidence score',
        example: 'Overall critique highlights that the only evidence is correlational and externally sourced; −30 pts, remaining 70/100.',
    }),
    __metadata("design:type", String)
], ScoreRationale.prototype, "authenticity_and_evidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reasoning for Clarity and Specificity score',
        example: 'No critique points target clarity; objectives, scope and metric definitions are well-articulated, so score kept high at 90/100.',
    }),
    __metadata("design:type", String)
], ScoreRationale.prototype, "clarity_and_specificity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reasoning for Risk Awareness score',
        example: 'Lack of counter-metrics and acknowledgement of metric gaming risk noted; −25 pts, leaving 75/100.',
    }),
    __metadata("design:type", String)
], ScoreRationale.prototype, "risk_awareness", void 0);
class AssessmentCenterResponseDto {
}
exports.AssessmentCenterResponseDto = AssessmentCenterResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Breakdown scores for 4 criteria',
        type: ClarityScores,
    }),
    __metadata("design:type", ClarityScores)
], AssessmentCenterResponseDto.prototype, "scores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Weighted overall score',
        example: 69.5,
    }),
    __metadata("design:type", Number)
], AssessmentCenterResponseDto.prototype, "overall_score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed rationale for each score',
        type: ScoreRationale,
    }),
    __metadata("design:type", ScoreRationale)
], AssessmentCenterResponseDto.prototype, "rationale", void 0);
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        example: 'Lỗi khi tạo assessment',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed error information',
        example: 'Missing analysis_board or product_critique',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=assessment-center.dto.js.map