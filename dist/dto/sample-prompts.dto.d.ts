export declare class SamplePromptDto {
    id: string;
    title: string;
    description: string;
}
export declare class SamplePromptsResponseDto {
    prompts: SamplePromptDto[];
    total: number;
}
export declare class ErrorResponseDto {
    statusCode: number;
    message: string;
    timestamp: string;
    path: string;
}
