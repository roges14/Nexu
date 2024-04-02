import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateModelDto {
    @IsNumber()
    @Min(100000)
    average_price: number;
}
