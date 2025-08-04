export declare class CreateProductCritiqueDto {
    analysis_board: any;
}
export declare class CritiquePoint {
    category: string;
    critique: string;
    challenge_question: string;
}
export declare class ProductCritiqueResponseDto {
    overall_summary: string;
    critique_points: CritiquePoint[];
}
export declare class ErrorResponseDto {
    message: string;
    error: string;
}
