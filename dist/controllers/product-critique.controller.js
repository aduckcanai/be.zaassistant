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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCritiqueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_critique_service_1 = require("../services/product-critique.service");
const product_critique_dto_1 = require("../dto/product-critique.dto");
let ProductCritiqueController = class ProductCritiqueController {
    constructor(productCritiqueService) {
        this.productCritiqueService = productCritiqueService;
    }
    async createProductCritique(request) {
        try {
            const result = await this.productCritiqueService.createProductCritique(request.analysis_board);
            return {
                overall_summary: result.overall_summary,
                critique_points: result.critique_points,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi tạo phân tích critique sản phẩm',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async retrieveResponse(responseId) {
        try {
            const result = await this.productCritiqueService.retrieveResponse(responseId);
            return {
                overall_summary: result.overall_summary,
                critique_points: result.critique_points,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: 'Lỗi khi lấy phản hồi critique',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductCritiqueController = ProductCritiqueController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create product critique analysis',
        description: 'Analyze an idea analysis board and provide detailed critique with strategic insights and challenge questions.',
    }),
    (0, swagger_1.ApiBody)({
        type: product_critique_dto_1.CreateProductCritiqueDto,
        description: 'JSON string containing analysis_board from idea_to_analysis API',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Product critique created successfully',
        type: product_critique_dto_1.ProductCritiqueResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request - Invalid input JSON',
        type: product_critique_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to create product critique',
        type: product_critique_dto_1.ErrorResponseDto,
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_critique_dto_1.CreateProductCritiqueDto]),
    __metadata("design:returntype", Promise)
], ProductCritiqueController.prototype, "createProductCritique", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve product critique by ID',
        description: 'Retrieve a previously created product critique using its response ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Response ID from OpenAI',
        example: 'resp_1234567890abcdef',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product critique retrieved successfully',
        type: product_critique_dto_1.ProductCritiqueResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Response not found',
        type: product_critique_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error - Failed to retrieve response',
        type: product_critique_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCritiqueController.prototype, "retrieveResponse", null);
exports.ProductCritiqueController = ProductCritiqueController = __decorate([
    (0, swagger_1.ApiTags)('responses/product_critique'),
    (0, common_1.Controller)('responses/product_critique'),
    __metadata("design:paramtypes", [product_critique_service_1.ProductCritiqueService])
], ProductCritiqueController);
//# sourceMappingURL=product-critique.controller.js.map