import { AnalysisBoard } from '../dto/idea-to-analysis.dto';
export interface SolutionArchitectResult {
    id: string;
    text: string;
    solution_architect: any;
    raw_json?: any;
}
export declare class SolutionArchitectService {
    private readonly logger;
    private openai;
    private readonly promptId;
    constructor();
    createSolutionArchitect(analysis_board: AnalysisBoard): Promise<SolutionArchitectResult>;
    retrieveResponse(responseId: string): Promise<SolutionArchitectResult>;
    private createFallbackResponse;
    private extractOutputText;
    private tryParseJSON;
}
