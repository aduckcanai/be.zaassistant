import { SolutionArchitectService } from '../services/solution-architect.service';
import { CreateSolutionArchitectDto } from '../dto/solution-architect.dto';
export declare class SolutionArchitectController {
    private readonly solutionArchitectService;
    constructor(solutionArchitectService: SolutionArchitectService);
    createSolutionArchitect(request: CreateSolutionArchitectDto): Promise<any>;
    retrieveResponse(responseId: string): Promise<any>;
}
