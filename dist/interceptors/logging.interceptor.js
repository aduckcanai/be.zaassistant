"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { method, url, body, query, params, headers } = request;
        const userAgent = headers['user-agent'] || '';
        const ip = request.ip || request.connection.remoteAddress;
        const startTime = Date.now();
        const requestId = this.generateRequestId();
        this.logger.log(JSON.stringify({
            type: 'REQUEST',
            requestId,
            method,
            url,
            query,
            params,
            body: this.sanitizeBody(body),
            userAgent,
            ip,
            timestamp: new Date().toISOString(),
        }, null, 2));
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const duration = Date.now() - startTime;
            this.logger.log(JSON.stringify({
                requestId,
                method,
                url,
                statusCode: response.statusCode,
                duration: `${duration}ms`,
                responseData: this.sanitizeResponse(data),
                timestamp: new Date().toISOString(),
            }, null, 2));
        }), (0, operators_1.catchError)((error) => {
            const duration = Date.now() - startTime;
            this.logger.error(`[${requestId}] Error Response: ${method} ${url} - ${error.status || 500} - ${duration}ms`, JSON.stringify({
                requestId,
                method,
                url,
                statusCode: error.status || 500,
                duration: `${duration}ms`,
                error: {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                },
                timestamp: new Date().toISOString(),
            }, null, 2));
            throw error;
        }));
    }
    generateRequestId() {
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    }
    sanitizeBody(body) {
        if (!body)
            return body;
        const sensitiveFields = [
            'password',
            'token',
            'secret',
            'key',
            'authorization',
        ];
        const sanitized = { ...body };
        sensitiveFields.forEach((field) => {
            if (sanitized[field]) {
                sanitized[field] = '***REDACTED***';
            }
        });
        return sanitized;
    }
    sanitizeResponse(data) {
        if (!data)
            return data;
        return this.createStructurePreview(data);
    }
    createStructurePreview(obj, depth = 0) {
        if (depth > 3)
            return '...';
        if (obj === null || obj === undefined)
            return obj;
        if (typeof obj === 'string') {
            return obj.length > 15 ? obj.substring(0, 15) + '...' : obj;
        }
        if (typeof obj === 'number' || typeof obj === 'boolean') {
            return obj;
        }
        if (Array.isArray(obj)) {
            if (obj.length === 0)
                return [];
            return [
                this.createStructurePreview(obj[0], depth + 1),
                ...(obj.length > 1 ? [`...${obj.length - 1} more items`] : []),
            ];
        }
        if (typeof obj === 'object') {
            const result = {};
            const keys = Object.keys(obj);
            for (const key of keys) {
                result[key] = this.createStructurePreview(obj[key], depth + 1);
            }
            return result;
        }
        return obj;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map