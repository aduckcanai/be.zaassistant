"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const assessment_center_controller_1 = require("./controllers/assessment-center.controller");
const assessment_center_service_1 = require("./services/assessment-center.service");
const idea_to_analysis_controller_1 = require("./controllers/idea-to-analysis.controller");
const idea_to_analysis_service_1 = require("./services/idea-to-analysis.service");
const product_critique_controller_1 = require("./controllers/product-critique.controller");
const product_critique_service_1 = require("./services/product-critique.service");
const solution_architect_controller_1 = require("./controllers/solution-architect.controller");
const solution_architect_service_1 = require("./services/solution-architect.service");
const solution_to_ui_controller_1 = require("./controllers/solution-to-ui.controller");
const solution_to_ui_service_1 = require("./services/solution-to-ui.service");
const sample_prompts_controller_1 = require("./controllers/sample-prompts.controller");
const sample_prompts_service_1 = require("./services/sample-prompts.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            assessment_center_controller_1.AssessmentCenterController,
            idea_to_analysis_controller_1.IdeaToAnalysisController,
            product_critique_controller_1.ProductCritiqueController,
            solution_architect_controller_1.SolutionArchitectController,
            solution_to_ui_controller_1.SolutionToUIController,
            sample_prompts_controller_1.SamplePromptsController,
        ],
        providers: [
            app_service_1.AppService,
            assessment_center_service_1.AssessmentCenterService,
            idea_to_analysis_service_1.IdeaToAnalysisService,
            product_critique_service_1.ProductCritiqueService,
            solution_architect_service_1.SolutionArchitectService,
            solution_to_ui_service_1.SolutionToUIService,
            sample_prompts_service_1.SamplePromptsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map