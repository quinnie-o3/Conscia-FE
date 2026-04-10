import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateGoalDto {
    @IsString()
    goalType: string;

    @IsNumber()
    @Min(1)
    targetValue: number;

    @IsString()
    periodType: string;

    @IsString()
    @IsOptional()
    appId: string;
}

export class UpdateGoalDto {
    @IsString()
    @IsOptional()
    goalType: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    targetValue: number;

    @IsString()
    @IsOptional()
    periodType: string;
}