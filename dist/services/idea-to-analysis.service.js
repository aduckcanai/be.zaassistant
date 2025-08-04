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
var IdeaToAnalysisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaToAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let IdeaToAnalysisService = IdeaToAnalysisService_1 = class IdeaToAnalysisService {
    constructor() {
        this.logger = new common_1.Logger(IdeaToAnalysisService_1.name);
        this.promptId = 'pmpt_6889cd12ae6081979995e96d062c79eb0e224fca80e8c5fc';
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async createIdeaToAnalysis(inputData) {
        try {
            let parsedInputData;
            try {
                parsedInputData = JSON.parse(inputData);
            }
            catch (parseError) {
                throw new Error(`Invalid JSON format: ${parseError.message}`);
            }
            this.logger.log('Creating idea to analysis transformation');
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
            this.logger.log(`Idea to analysis created successfully with ID: ${response.id}`);
            if (parsed && parsed.analysis_board) {
                return {
                    id: response.id,
                    text: content,
                    analysis_board: parsed.analysis_board,
                    raw_json: parsed,
                };
            }
            else {
                return {
                    id: response.id,
                    text: content,
                    analysis_board: {
                        product_goal: 'Unable to parse structured goal',
                        user_problem_goal: {
                            problem: 'Unable to parse problem',
                            user_goal: 'Unable to parse user goal',
                        },
                        target_segments: [],
                        user_insights_data: [],
                        scope: {
                            in_scope: [],
                            out_scope: [],
                            constraints: [],
                        },
                        success_metrics: [],
                    },
                };
            }
        }
        catch (error) {
            this.logger.error('Error in createIdeaToAnalysis:', error);
            throw new Error(`Failed to create idea to analysis: ${error.message}`);
        }
    }
    async retrieveResponse(responseId) {
        try {
            this.logger.log(`Retrieving idea to analysis response: ${responseId}`);
            const response = await this.openai.responses.retrieve(responseId);
            const content = this.extractOutputText(response);
            const parsed = this.tryParseJSON(content);
            if (parsed && parsed.analysis_board) {
                return {
                    id: responseId,
                    text: content,
                    analysis_board: parsed.analysis_board,
                    raw_json: parsed,
                };
            }
            else {
                return {
                    id: responseId,
                    text: content,
                    analysis_board: {
                        product_goal: 'Unable to parse structured goal',
                        user_problem_goal: {
                            problem: 'Unable to parse problem',
                            user_goal: 'Unable to parse user goal',
                        },
                        target_segments: [],
                        user_insights_data: [],
                        scope: {
                            in_scope: [],
                            out_scope: [],
                            constraints: [],
                        },
                        success_metrics: [],
                    },
                };
            }
        }
        catch (error) {
            this.logger.error('Error retrieving idea to analysis response:', error);
            throw new Error(`Failed to retrieve response: ${error.message}`);
        }
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
exports.IdeaToAnalysisService = IdeaToAnalysisService;
exports.IdeaToAnalysisService = IdeaToAnalysisService = IdeaToAnalysisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IdeaToAnalysisService);
//# sourceMappingURL=idea-to-analysis.service.js.map