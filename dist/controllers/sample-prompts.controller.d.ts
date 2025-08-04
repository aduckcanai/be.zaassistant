import { SamplePromptsService } from '../services/sample-prompts.service';
import { SamplePromptsResponseDto } from '../dto/sample-prompts.dto';
export declare class SamplePromptsController {
    private readonly samplePromptsService;
    constructor(samplePromptsService: SamplePromptsService);
    getAllPrompts(): Promise<SamplePromptsResponseDto>;
}
