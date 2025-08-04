export interface AssessmentCenterResult {
    id: string;
    text: string;
    scores: {
        strategic_alignment: number;
        authenticity_and_evidence: number;
        clarity_and_specificity: number;
        risk_awareness: number;
    };
    overall_score: number;
    rationale: {
        strategic_alignment: string;
        authenticity_and_evidence: string;
        clarity_and_specificity: string;
        risk_awareness: string;
    };
    raw_json?: any;
}
export declare class AssessmentCenterService {
    private readonly logger;
    private openai;
    private readonly promptId;
    constructor();
    createAssessment(analysisBoard: any, productCritique: any): Promise<AssessmentCenterResult>;
    retrieveResponse(responseId: string): Promise<AssessmentCenterResult>;
    private parseTextAssessment;
    private extractRationale;
    private isValidAssessmentResponse;
    private extractOutputText;
    private tryParseJSON;
}
