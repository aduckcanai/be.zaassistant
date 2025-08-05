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
var FieldEditService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldEditService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let FieldEditService = FieldEditService_1 = class FieldEditService {
    constructor() {
        this.logger = new common_1.Logger(FieldEditService_1.name);
        this.promptId = 'pmpt_6891900364688195ba5b137631ff8cf609deaf0c90a8cf47';
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async processFieldEdit(analysis_board, field_name, updated_field) {
        try {
            this.logger.log(`Processing field edit with ID: ${this.promptId}`);
            this.logger.log(`Updating field: ${field_name}`);
            const mergedInput = JSON.stringify({
                analysis_board: analysis_board,
                field_name: field_name,
                updated_field: updated_field,
            });
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
                                text: mergedInput,
                            },
                        ],
                    },
                ],
                store: true,
            });
            const content = this.extractOutputText(response);
            const parsedData = this.tryParseJSON(content);
            this.logger.log(`Field edit processed successfully with ID: ${response.id}`);
            let updatedValue = null;
            if (parsedData && parsedData[field_name]) {
                updatedValue = parsedData[field_name];
            }
            else if (parsedData) {
                updatedValue = parsedData;
            }
            return {
                id: response.id,
                field_name: field_name,
                updated_value: updatedValue,
                raw_content: content,
            };
        }
        catch (error) {
            this.logger.error('Error in processFieldEdit:', error);
            throw new Error(`Failed to process field edit: ${error.message}`);
        }
    }
    async retrieveResponse(responseId) {
        try {
            this.logger.log(`Retrieving field edit response: ${responseId}`);
            const response = await this.openai.responses.retrieve(responseId);
            const content = this.extractOutputText(response);
            const parsedData = this.tryParseJSON(content);
            let field_name = 'unknown';
            let updated_value = parsedData;
            if (parsedData && typeof parsedData === 'object') {
                const keys = Object.keys(parsedData);
                if (keys.length === 1) {
                    field_name = keys[0];
                    updated_value = parsedData[field_name];
                }
            }
            return {
                id: responseId,
                field_name: field_name,
                updated_value: updated_value,
                raw_content: content,
            };
        }
        catch (error) {
            this.logger.error('Error retrieving field edit response:', error);
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
exports.FieldEditService = FieldEditService;
exports.FieldEditService = FieldEditService = FieldEditService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FieldEditService);
//# sourceMappingURL=field-edit.service.js.map