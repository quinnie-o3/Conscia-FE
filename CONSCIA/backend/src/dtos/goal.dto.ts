import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoalDto {
    @ApiProperty({ example: 'Daily Study' })
    @IsString()
    goalType: string;

    @ApiProperty({ example: 60 })
    @IsNumber()
    @Min(1)
    targetValue: number;

    @ApiProperty({ example: 'daily' })
    @IsString()
    periodType: string;

    @ApiPropertyOptional({ example: 'com.example.app' })
    @IsString()
    @IsOptional()
    appId: string;
}

export class UpdateGoalDto {
    @ApiPropertyOptional({ example: 'Daily Study' })
    @IsString()
    @IsOptional()
    goalType: string;

    @ApiPropertyOptional({ example: 60 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    targetValue: number;

    @ApiPropertyOptional({ example: 'daily' })
    @IsString()
    @IsOptional()
    periodType: string;
}