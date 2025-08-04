import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getDemo(res: Response): void;
    getHealth(): {
        status: string;
        timestamp: string;
        service: string;
    };
}
