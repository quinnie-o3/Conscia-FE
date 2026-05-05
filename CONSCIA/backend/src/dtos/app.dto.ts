import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppDto {
    @ApiProperty({ example: 'com.example.app' })
    @IsString()
    packageName: string;

    @ApiProperty({ example: 'Example App' })
    @IsString()
    appName: string;

    @ApiProperty({ example: 'Productivity' })
    @IsString()
    category: string;

    @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
    @IsString()
    @IsOptional()
    iconReference: string;
}

export class CreateAppBatchDto {
    @ApiProperty({ type: [CreateAppDto] })
    @IsArray()
    apps: CreateAppDto[];
}

export class UpdateAppDto {
    @ApiPropertyOptional({ example: 'Example App' })
    @IsString()
    @IsOptional()
    appName: string;

    @ApiPropertyOptional({ example: 'Productivity' })
    @IsString()
    @IsOptional()
    category: string;

    @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
    @IsString()
    @IsOptional()
    iconReference: string;
}