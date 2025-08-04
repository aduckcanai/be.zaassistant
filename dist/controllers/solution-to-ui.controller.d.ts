import { SolutionToUIService } from '../services/solution-to-ui.service';
import { CreateSolutionToUIDto, SolutionToUIResponseDto } from '../dto/solution-to-ui.dto';
export declare class SolutionToUIController {
    private readonly solutionToUIService;
    constructor(solutionToUIService: SolutionToUIService);
    createSolutionToUI(request: CreateSolutionToUIDto): Promise<SolutionToUIResponseDto>;
    retrieveResponse(responseId: string): Promise<SolutionToUIResponseDto>;
    previewHTML(responseId: string): Promise<string>;
    getMockups(responseId: string): Promise<any>;
    previewMockup(responseId: string, mockupIndex: string): Promise<string>;
}
