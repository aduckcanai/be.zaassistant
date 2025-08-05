export interface FieldEditResult {
    id: string;
    field_name: string;
    updated_value: any;
    raw_content?: string;
}
export declare class FieldEditService {
    private readonly logger;
    private openai;
    private readonly promptId;
    constructor();
    processFieldEdit(analysis_board: any, field_name: string, updated_field: any): Promise<FieldEditResult>;
    retrieveResponse(responseId: string): Promise<FieldEditResult>;
    private extractOutputText;
    private tryParseJSON;
}
