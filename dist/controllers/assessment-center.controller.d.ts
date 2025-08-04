import { AssessmentCenterService } from '../services/assessment-center.service';
import { CreateAssessmentCenterDto } from '../dto/assessment-center.dto';
export declare class AssessmentCenterController {
    private readonly assessmentCenterService;
    constructor(assessmentCenterService: AssessmentCenterService);
    createAssessment(request: CreateAssessmentCenterDto): Promise<any>;
    retrieveResponse(responseId: string): Promise<any>;
}
