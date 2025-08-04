export declare class CreateIdeaToAnalysisDto {
    inputData: string;
}
export declare class UserProblemGoal {
    problem: string;
    user_goal: string;
}
export declare class UserInsight {
    insight: string;
    evidence: string;
    source_type: string;
    source_detail: string;
}
export declare class ProjectScope {
    in_scope: string[];
    out_scope: string[];
    constraints: string[];
}
export declare class SuccessMetric {
    name: string;
    type: string;
    formula: string;
    target: string;
}
export declare class AnalysisBoard {
    product_goal: string;
    user_problem_goal: UserProblemGoal;
    target_segments: string[];
    user_insights_data: UserInsight[];
    scope: ProjectScope;
    success_metrics: SuccessMetric[];
}
export declare class IdeaToAnalysisResponseDto {
    analysis_board: AnalysisBoard;
}
export declare class ErrorResponseDto {
    message: string;
    error: string;
}
