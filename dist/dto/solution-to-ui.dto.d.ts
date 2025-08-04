export declare class RiskAnalysisInput {
    risk: string;
    mitigation_idea: string;
    resulting_tradeoff: string;
}
export declare class SolutionApproachInput {
    approach_name: string;
    description: string;
    core_tradeoff: string;
    key_benefits: string[];
    implementation_risk_analysis: RiskAnalysisInput[];
}
export declare class CreateSolutionToUIDto {
    problem_statement: string;
    selected_approach?: SolutionApproachInput;
    all_approaches?: SolutionApproachInput[];
}
export declare class SolutionToUIResponseDto {
    html_content: string;
    response_id: string;
}
export declare class ErrorResponseDto {
    message: string;
    error: string;
}
