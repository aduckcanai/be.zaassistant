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
exports.ErrorResponseDto = exports.IdeaToAnalysisResponseDto = exports.AnalysisBoard = exports.SuccessMetric = exports.ProjectScope = exports.UserInsight = exports.UserProblemGoal = exports.CreateIdeaToAnalysisDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateIdeaToAnalysisDto {
}
exports.CreateIdeaToAnalysisDto = CreateIdeaToAnalysisDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JSON string containing input data for idea to analysis transformation',
        example: '{"idea": "My startup idea", "context": "Market analysis"}',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateIdeaToAnalysisDto.prototype, "inputData", void 0);
class UserProblemGoal {
}
exports.UserProblemGoal = UserProblemGoal;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Core problem identified',
        example: 'New learners fail to form a daily study habit in the first week',
    }),
    __metadata("design:type", String)
], UserProblemGoal.prototype, "problem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User goal to solve the problem',
        example: 'Get quick, bite-sized English practice that fits their daily routine',
    }),
    __metadata("design:type", String)
], UserProblemGoal.prototype, "user_goal", void 0);
class UserInsight {
}
exports.UserInsight = UserInsight;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key insight about user behavior',
        example: 'Streak mechanics combined with visible progress indicators materially increase first-week habit formation',
    }),
    __metadata("design:type", String)
], UserInsight.prototype, "insight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Evidence supporting the insight',
        example: 'Duolingo reported a 24% uplift in D7 retention after launching streak notifications',
    }),
    __metadata("design:type", String)
], UserInsight.prototype, "evidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of source',
        example: 'WEB_SEARCH',
    }),
    __metadata("design:type", String)
], UserInsight.prototype, "source_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed source information',
        example: 'https://blog.duolingo.com/streaks-retention-study-2023',
    }),
    __metadata("design:type", String)
], UserInsight.prototype, "source_detail", void 0);
class ProjectScope {
}
exports.ProjectScope = ProjectScope;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items included in project scope',
        type: [String],
        example: ['Revamp onboarding flow', 'Implement daily streak system'],
    }),
    __metadata("design:type", Array)
], ProjectScope.prototype, "in_scope", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items explicitly excluded from scope',
        type: [String],
        example: ['Rewriting core curriculum', 'Paid acquisition programs'],
    }),
    __metadata("design:type", Array)
], ProjectScope.prototype, "out_scope", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project constraints',
        type: [String],
        example: ['Mobile team bandwidth: 2 iOS, 2 Android, 1 BE engineer'],
    }),
    __metadata("design:type", Array)
], ProjectScope.prototype, "constraints", void 0);
class SuccessMetric {
}
exports.SuccessMetric = SuccessMetric;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Metric name',
        example: '7-day new-user retention (D7)',
    }),
    __metadata("design:type", String)
], SuccessMetric.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Metric type',
        example: 'primary',
    }),
    __metadata("design:type", String)
], SuccessMetric.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'How the metric is calculated',
        example: 'Number of users who install on Day 0 and open the app on Day 7 ÷ total installs on Day 0',
    }),
    __metadata("design:type", String)
], SuccessMetric.prototype, "formula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Target value for the metric',
        example: '≥55%',
    }),
    __metadata("design:type", String)
], SuccessMetric.prototype, "target", void 0);
class AnalysisBoard {
}
exports.AnalysisBoard = AnalysisBoard;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product goal statement',
        example: 'By 31 Dec 2024, increase the 7-day new-user retention rate from 38% to at least 55%',
    }),
    __metadata("design:type", String)
], AnalysisBoard.prototype, "product_goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User problem and goal definition',
        type: UserProblemGoal,
    }),
    __metadata("design:type", UserProblemGoal)
], AnalysisBoard.prototype, "user_problem_goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Target user segments',
        type: [String],
        example: [
            'Busy young professionals (22-35)',
            'University students preparing for TOEIC/IELTS',
        ],
    }),
    __metadata("design:type", Array)
], AnalysisBoard.prototype, "target_segments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User insights with supporting data',
        type: [UserInsight],
    }),
    __metadata("design:type", Array)
], AnalysisBoard.prototype, "user_insights_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project scope definition',
        type: ProjectScope,
    }),
    __metadata("design:type", ProjectScope)
], AnalysisBoard.prototype, "scope", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Success metrics and targets',
        type: [SuccessMetric],
    }),
    __metadata("design:type", Array)
], AnalysisBoard.prototype, "success_metrics", void 0);
class IdeaToAnalysisResponseDto {
}
exports.IdeaToAnalysisResponseDto = IdeaToAnalysisResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Structured analysis board',
        type: AnalysisBoard,
    }),
    __metadata("design:type", AnalysisBoard)
], IdeaToAnalysisResponseDto.prototype, "analysis_board", void 0);
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
        example: 'Invalid JSON format in inputData',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=idea-to-analysis.dto.js.map