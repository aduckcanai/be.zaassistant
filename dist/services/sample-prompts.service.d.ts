import { SamplePromptDto } from '../dto/sample-prompts.dto';
export declare class SamplePromptsService {
    private readonly samplePrompts;
    getAllPrompts(): {
        prompts: SamplePromptDto[];
        total: number;
    };
}
