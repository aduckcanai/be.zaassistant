export interface IdeaToAnalysisResult {
    id: string;
    text: string;
    analysis_board: any;
    raw_json?: any;
}
export declare class IdeaToAnalysisService {
    private readonly logger;
    private openai;
    private readonly promptId;
    constructor();
    createIdeaToAnalysis(inputData: string): Promise<IdeaToAnalysisResult>;
    retrieveResponse(responseId: string): Promise<IdeaToAnalysisResult>;
    private extractOutputText;
    private tryParseJSON;
}
