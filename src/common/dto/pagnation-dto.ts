import { Min, IsOptional, IsPositive, IsNumber } from "class-validator";
import { of } from "rxjs";

export class PaginationDto{
    
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?:number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?:number;

    constructor(limit:number, offset:number)
    {
        this.limit=limit;
        this.offset=offset;
    }




}