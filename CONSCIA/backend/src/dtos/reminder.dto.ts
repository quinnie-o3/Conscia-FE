import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReminderDto {
    @ApiProperty({ example: 'DAILY_LIMIT' })
    @IsString()
    type: string;

    @ApiProperty({ example: 60 })
    @IsNumber()
    @Min(0)
    conditionValue: number;

    @ApiPropertyOptional({ example: 'Limit reached message' })
    @IsString()
    @IsOptional()
    message: string;
}

export class UpdateReminderDto {
    @ApiPropertyOptional({ example: 'DAILY_LIMIT' })
    @IsString()
    @IsOptional()
    type: string;

    @ApiPropertyOptional({ example: 60 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    conditionValue: number;

    @ApiPropertyOptional({ example: 'Limit reached message' })
    @IsString()
    @IsOptional()
    message: string;
}