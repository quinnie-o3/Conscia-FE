import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateReminderDto {
    @IsString()
    type: string;

    @IsNumber()
    @Min(0)
    conditionValue: number;

    @IsString()
    @IsOptional()
    message: string;
}

export class UpdateReminderDto {
    @IsString()
    @IsOptional()
    type: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    conditionValue: number;

    @IsString()
    @IsOptional()
    message: string;
}