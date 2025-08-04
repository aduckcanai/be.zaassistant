import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentCenterController } from './controllers/assessment-center.controller';
import { AssessmentCenterService } from './services/assessment-center.service';
import { IdeaToAnalysisController } from './controllers/idea-to-analysis.controller';
import { IdeaToAnalysisService } from './services/idea-to-analysis.service';
import { ProductCritiqueController } from './controllers/product-critique.controller';
import { ProductCritiqueService } from './services/product-critique.service';
import { SolutionArchitectController } from './controllers/solution-architect.controller';
import { SolutionArchitectService } from './services/solution-architect.service';
import { SolutionToUIController } from './controllers/solution-to-ui.controller';
import { SolutionToUIService } from './services/solution-to-ui.service';
import { SamplePromptsController } from './controllers/sample-prompts.controller';
import { SamplePromptsService } from './services/sample-prompts.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    AppController,
    AssessmentCenterController,
    IdeaToAnalysisController,
    ProductCritiqueController,
    SolutionArchitectController,
    SolutionToUIController,
    SamplePromptsController,
  ],
  providers: [
    AppService,
    AssessmentCenterService,
    IdeaToAnalysisService,
    ProductCritiqueService,
    SolutionArchitectService,
    SolutionToUIService,
    SamplePromptsService,
  ],
})
export class AppModule {}
