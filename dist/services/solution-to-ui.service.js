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
var SolutionToUIService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionToUIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let SolutionToUIService = SolutionToUIService_1 = class SolutionToUIService {
    constructor() {
        this.logger = new common_1.Logger(SolutionToUIService_1.name);
        this.promptId = 'pmpt_688b156a4c008197b05753b165eee2b80296fdec47313e57';
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not configured');
        }
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async createSolutionToUI(requestData) {
        try {
            this.logger.log('Creating solution to UI transformation');
            const inputData = JSON.stringify(requestData);
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
            const htmlContent = this.extractHTML(content);
            this.logger.log(`Solution to UI created successfully with ID: ${response.id}`);
            return {
                id: response.id,
                text: content,
                html_content: htmlContent,
            };
        }
        catch (error) {
            this.logger.error('Error in createSolutionToUI:', error);
            throw new Error(`Failed to create solution to UI: ${error.message}`);
        }
    }
    async retrieveResponse(responseId) {
        try {
            this.logger.log(`Retrieving solution to UI response: ${responseId}`);
            const response = await this.openai.responses.retrieve(responseId);
            const content = this.extractOutputText(response);
            const htmlContent = this.extractHTML(content);
            return {
                id: responseId,
                text: content,
                html_content: htmlContent,
            };
        }
        catch (error) {
            this.logger.error('Error retrieving solution to UI response:', error);
            throw new Error(`Failed to retrieve response: ${error.message}`);
        }
    }
    extractHTML(content) {
        try {
            const parsed = JSON.parse(content);
            if (parsed.selected_mockups && Array.isArray(parsed.selected_mockups)) {
                const firstMockup = parsed.selected_mockups[0];
                if (firstMockup && firstMockup.html_code) {
                    return this.unescapeHtml(firstMockup.html_code);
                }
            }
            if (parsed.html_content) {
                return this.unescapeHtml(parsed.html_content);
            }
            if (typeof parsed === 'string') {
                return this.processHtmlString(parsed);
            }
        }
        catch (parseError) {
            this.logger.warn(`Failed to parse JSON, treating as raw content: ${parseError.message}`);
        }
        return this.processHtmlString(content);
    }
    processHtmlString(content) {
        let htmlContent = content
            .replace(/```html\s*\n?/gi, '')
            .replace(/```\s*$/g, '')
            .trim();
        if (!htmlContent.toLowerCase().includes('<html') &&
            !htmlContent.toLowerCase().includes('<!doctype')) {
            if (htmlContent.includes('<div') ||
                htmlContent.includes('<p') ||
                htmlContent.includes('<h')) {
                htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solution UI</title>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
            }
        }
        return htmlContent;
    }
    unescapeHtml(escapedHtml) {
        return escapedHtml
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\r/g, '\r')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\');
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
};
exports.SolutionToUIService = SolutionToUIService;
exports.SolutionToUIService = SolutionToUIService = SolutionToUIService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SolutionToUIService);
//# sourceMappingURL=solution-to-ui.service.js.map