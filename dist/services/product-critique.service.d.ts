export interface ProductCritiqueResult {
    id: string;
    text: string;
    overall_summary: string;
    critique_points: any[];
    raw_json?: any;
}
export declare class ProductCritiqueService {
    private readonly logger;
    private openai;
    private readonly promptId;
    constructor();
    createProductCritique(analysisBoard: any): Promise<ProductCritiqueResult>;
    retrieveResponse(responseId: string): Promise<ProductCritiqueResult>;
    private extractOutputText;
    private tryParseJSON;
}
