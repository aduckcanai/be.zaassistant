import { ProductCritiqueService } from '../services/product-critique.service';
import { CreateProductCritiqueDto } from '../dto/product-critique.dto';
export declare class ProductCritiqueController {
    private readonly productCritiqueService;
    constructor(productCritiqueService: ProductCritiqueService);
    createProductCritique(request: CreateProductCritiqueDto): Promise<any>;
    retrieveResponse(responseId: string): Promise<any>;
}
