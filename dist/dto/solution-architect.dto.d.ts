import { AnalysisBoard } from './idea-to-analysis.dto';
export declare class CreateSolutionArchitectDto {
    analysis_board: AnalysisBoard;
}
export declare class RiskAnalysis {
    risk: string;
    mitigation_idea: string;
    resulting_tradeoff: string;
}
export declare class SolutionApproach {
    approach_name: string;
    description: string;
    core_tradeoff: string;
    key_benefits: string[];
    implementation_risk_analysis: RiskAnalysis[];
}
export declare class HeuristicFinding {
    heuristic: string;
    assessment: string;
}
export declare class HeuristicEvaluation {
    approach_name: string;
    findings: HeuristicFinding[];
}
export declare class PrioritizationMatrix {
    approach_name: string;
    impact_score: string;
    effort_score: string;
    confidence_score: string;
}
export declare class ComparisonSummary {
    heuristic_evaluation: HeuristicEvaluation[];
    prioritization_matrix: PrioritizationMatrix[];
    recommendation: string;
}
export declare class SolutionArchitectResponseDto {
    problem_statement: string;
    solution_analysis: SolutionApproach[];
    comparison_summary: ComparisonSummary;
}
export declare class ErrorResponseDto {
    message: string;
    error: string;
}
