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
var SolutionArchitectService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionArchitectService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let SolutionArchitectService = SolutionArchitectService_1 = class SolutionArchitectService {
    constructor() {
        this.logger = new common_1.Logger(SolutionArchitectService_1.name);
        this.promptId = 'pmpt_6890dc4fd7ac81979f1077cd714754160cbebea41a3f664a';
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async createSolutionArchitect(analysis_board) {
        try {
            this.logger.log('Creating solution architect analysis');
            const inputData = JSON.stringify({ analysis_board });
            const response = await this.openai.responses.create({
                prompt: {
                    id: this.promptId,
                },
                input: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'input_text',
                                text: inputData,
                            },
                        ],
                    },
                ],
                store: true,
            });
            const content = this.extractOutputText(response);
            const parsed = this.tryParseJSON(content);
            this.logger.log(`Solution architect analysis created successfully with ID: ${response.id}`);
            if (parsed && (parsed.problem_statement || parsed.solution_analysis)) {
                return {
                    id: response.id,
                    text: content,
                    solution_architect: parsed,
                    raw_json: parsed,
                };
            }
            else {
                return {
                    id: response.id,
                    text: content,
                    solution_architect: this.createFallbackResponse(analysis_board),
                };
            }
        }
        catch (error) {
            this.logger.error('Error in createSolutionArchitect:', error);
            throw new Error(`Failed to create solution architect analysis: ${error.message}`);
        }
    }
    async retrieveResponse(responseId) {
        try {
            this.logger.log(`Retrieving solution architect response: ${responseId}`);
            const response = await this.openai.responses.retrieve(responseId);
            const content = this.extractOutputText(response);
            const parsed = this.tryParseJSON(content);
            if (parsed && (parsed.problem_statement || parsed.solution_analysis)) {
                return {
                    id: responseId,
                    text: content,
                    solution_architect: parsed,
                    raw_json: parsed,
                };
            }
            else {
                return {
                    id: responseId,
                    text: content,
                    solution_architect: {
                        problem_statement: 'Unable to parse problem statement',
                        solution_analysis: [],
                        comparison_summary: {
                            heuristic_evaluation: [],
                            prioritization_matrix: [],
                            recommendation: 'Unable to generate recommendation',
                        },
                    },
                };
            }
        }
        catch (error) {
            this.logger.error('Error retrieving solution architect response:', error);
            throw new Error(`Failed to retrieve response: ${error.message}`);
        }
    }
    createFallbackResponse(analysis_board) {
        return {
            problem_statement: `Làm thế nào để đạt được mục tiêu: ${analysis_board.product_goal}`,
            solution_analysis: [
                {
                    approach_name: 'Phương pháp Tiêu chuẩn',
                    description: 'Triển khai giải pháp theo cách truyền thống với các bước được kiểm chứng.',
                    core_tradeoff: 'Đánh đổi tốc độ triển khai để đảm bảo độ ổn định',
                    key_benefits: [
                        'Giảm thiểu rủi ro',
                        'Dễ dàng bảo trì',
                        'Có thể dự đoán kết quả',
                    ],
                    implementation_risk_analysis: [
                        {
                            risk: 'Có thể mất nhiều thời gian hơn dự kiến',
                            mitigation_idea: 'Chia nhỏ thành các milestone ngắn hạn',
                            resulting_tradeoff: 'Tăng overhead quản lý dự án',
                        },
                    ],
                },
            ],
            comparison_summary: {
                heuristic_evaluation: [
                    {
                        approach_name: 'Phương pháp Tiêu chuẩn',
                        findings: [
                            {
                                heuristic: 'Visibility of system status',
                                assessment: 'Hỗ trợ tốt - cung cấp feedback rõ ràng',
                            },
                        ],
                    },
                ],
                prioritization_matrix: [
                    {
                        approach_name: 'Phương pháp Tiêu chuẩn',
                        impact_score: 'Medium',
                        effort_score: 'Medium',
                        confidence_score: 'High',
                    },
                ],
                recommendation: 'Khuyến nghị sử dụng phương pháp tiêu chuẩn do độ tin cậy cao',
            },
        };
    }
    extractOutputText(response) {
        if (response.output_text) {
            return response.output_text;
        }
        if (response.output && Array.isArray(response.output)) {
            const textItem = response.output.find((item) => item.type === 'message' &&
                item.content &&
                item.content.length > 0 &&
                item.content[0].type === 'output_text');
            if (textItem) {
                return textItem.content[0].text || 'Không thể tạo phản hồi.';
            }
        }
        if (response.choices && response.choices.length > 0) {
            const choice = response.choices[0];
            if (choice.message && Array.isArray(choice.message.content)) {
                const first = choice.message.content.find((c) => c.text);
                if (first)
                    return first.text;
            }
        }
        return 'Không thể tạo phản hồi.';
    }
    tryParseJSON(jsonString) {
        const cleaned = jsonString.replace(/```json|```/g, '').trim();
        try {
            return JSON.parse(cleaned);
        }
        catch (e1) {
            this.logger.warn(`Failed to parse JSON: ${e1.message}`);
            return null;
        }
    }
};
exports.SolutionArchitectService = SolutionArchitectService;
exports.SolutionArchitectService = SolutionArchitectService = SolutionArchitectService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SolutionArchitectService);
//# sourceMappingURL=solution-architect.service.js.map