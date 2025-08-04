export declare class CreateAssessmentCenterDto {
    analysis_board: any;
    product_critique: any;
}
export declare class ClarityScores {
    strategic_alignment: number;
    authenticity_and_evidence: number;
    clarity_and_specificity: number;
    risk_awareness: number;
}
export declare class ScoreRationale {
    strategic_alignment: string;
    authenticity_and_evidence: string;
    clarity_and_specificity: string;
    risk_awareness: string;
}
export declare class AssessmentCenterResponseDto {
    scores: ClarityScores;
    overall_score: number;
    rationale: ScoreRationale;
}
export declare class ErrorResponseDto {
    message: string;
    error: string;
}
