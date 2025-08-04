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
var ProductCritiqueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCritiqueService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let ProductCritiqueService = ProductCritiqueService_1 = class ProductCritiqueService {
    constructor() {
        this.logger = new common_1.Logger(ProductCritiqueService_1.name);
        this.promptId = 'pmpt_6889d904d70c81968dbff68a53526cd80221a20f1953bfb7';
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async createProductCritique(analysisBoard) {
        try {
            if (!analysisBoard || !analysisBoard.product_goal) {
                throw new Error('Invalid analysis_board structure - missing product_goal');
            }
            this.logger.log('Creating product critique for analysis board');
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
                                text: JSON.stringify({ analysis_board: analysisBoard }, null, 2),
                            },
                        ],
                    },
                ],
                store: true,
            });
            const content = this.extractOutputText(response);
            const parsed = this.tryParseJSON(content);
            this.logger.log(`Product critique created successfully with ID: ${response.id}`);
            if (parsed && parsed.overall_summary && parsed.critique_points) {
                return {
                    id: response.id,
                    text: content,
                    overall_summary: parsed.overall_summary,
                    critique_points: parsed.critique_points,
                    raw_json: parsed,
                };
            }
            else {
                return {
                    id: response.id,
                    text: content,
                    overall_summary: content,
                    critique_points: [],
                };
            }
        }
        catch (error) {
            this.logger.error('Error in createProductCritique:', error);
            throw new Error(`Failed to create product critique: ${error.message}`);
        }
    }
    async retrieveResponse(responseId) {
        try {
            this.logger.log(`Retrieving product critique response: ${responseId}`);
            const response = await this.openai.responses.retrieve(responseId);
            const content = this.extractOutputText(response);
            const parsed = this.tryParseJSON(content);
            if (parsed && parsed.overall_summary && parsed.critique_points) {
                return {
                    id: responseId,
                    text: content,
                    overall_summary: parsed.overall_summary,
                    critique_points: parsed.critique_points,
                    raw_json: parsed,
                };
            }
            else {
                return {
                    id: responseId,
                    text: content,
                    overall_summary: content,
                    critique_points: [],
                };
            }
        }
        catch (error) {
            this.logger.error('Error retrieving product critique response:', error);
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
exports.ProductCritiqueService = ProductCritiqueService;
exports.ProductCritiqueService = ProductCritiqueService = ProductCritiqueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductCritiqueService);
//# sourceMappingURL=product-critique.service.js.map