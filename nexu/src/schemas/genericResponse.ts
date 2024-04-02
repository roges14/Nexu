import { HttpStatus } from "@nestjs/common";

export interface HttpResponse {
    code: HttpStatus;
    message: string;
    resultset: any;
    count?: number;
}