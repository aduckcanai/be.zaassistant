"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplePromptsService = void 0;
const common_1 = require("@nestjs/common");
let SamplePromptsService = class SamplePromptsService {
    constructor() {
        this.samplePrompts = [
            {
                id: 'prompt_001',
                title: 'Cải thiện retention cho app học tiếng Anh',
                description: 'Người dùng là một Product Owner tại một app học tiếng Anh, họ muốn tìm cách cải thiện việc duy trì học hàng ngày (retention) của người dùng mới trong 7 ngày đầu.',
            },
            {
                id: 'prompt_002',
                title: 'Tối ưu UX cho app e-commerce',
                description: 'Người dùng là một UX Designer tại một công ty e-commerce, họ cần tối ưu hóa flow mua hàng để giảm tỷ lệ abandon cart từ 65% xuống dưới 40% trong Q2.',
            },
            {
                id: 'prompt_003',
                title: 'Chiến lược marketing cho startup fintech',
                description: 'Người dùng là Marketing Manager tại một startup fintech mới thành lập, họ cần xây dựng chiến lược marketing để thu hút 10,000 người dùng đầu tiên với ngân sách chỉ 50,000 USD.',
            },
        ];
    }
    getAllPrompts() {
        return {
            prompts: this.samplePrompts,
            total: this.samplePrompts.length,
        };
    }
};
exports.SamplePromptsService = SamplePromptsService;
exports.SamplePromptsService = SamplePromptsService = __decorate([
    (0, common_1.Injectable)()
], SamplePromptsService);
//# sourceMappingURL=sample-prompts.service.js.map