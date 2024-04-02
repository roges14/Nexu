import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateModelDto {
    @IsString()
    name: string;
    
    @IsNumber()
    @IsOptional()
    @Min(100000)
    average_price: number;
}
