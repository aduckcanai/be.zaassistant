import { CreateSolutionToUIDto } from '../dto/solution-to-ui.dto';
export interface SolutionToUIResult {
    id: string;
    text: string;
    html_content: string;
    raw_json?: any;
}
export declare class SolutionToUIService {
    private readonly logger;
    private openai;
    private readonly promptId;
    constructor();
    createSolutionToUI(requestData: CreateSolutionToUIDto): Promise<SolutionToUIResult>;
    retrieveResponse(responseId: string): Promise<SolutionToUIResult>;
    private extractHTML;
    private processHtmlString;
    private unescapeHtml;
    private extractOutputText;
}
