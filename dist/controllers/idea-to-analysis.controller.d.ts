import { IdeaToAnalysisService, IdeaToAnalysisResult } from '../services/idea-to-analysis.service';
import { CreateIdeaToAnalysisDto } from '../dto/idea-to-analysis.dto';
export declare class IdeaToAnalysisController {
    private readonly ideaToAnalysisService;
    constructor(ideaToAnalysisService: IdeaToAnalysisService);
    createIdeaToAnalysis(request: CreateIdeaToAnalysisDto): Promise<IdeaToAnalysisResult>;
    retrieveResponse(responseId: string): Promise<IdeaToAnalysisResult>;
}
