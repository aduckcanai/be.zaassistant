import { FieldEditService } from '../services/field-edit.service';
import { CreateFieldEditDto, FieldEditResponseDto } from '../dto/field-edit.dto';
export declare class FieldEditController {
    private readonly fieldEditService;
    constructor(fieldEditService: FieldEditService);
    processFieldEdit(request: CreateFieldEditDto): Promise<FieldEditResponseDto>;
    retrieveResponse(responseId: string): Promise<FieldEditResponseDto>;
}
