import { IsString, IsOptional, IsHexColor } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePurposeTagDto {
    @ApiProperty({ example: 'Learning' })
    @IsString()
    tagName: string;

    @ApiPropertyOptional({ example: '#4CAF50' })
    @IsHexColor()
    @IsOptional()
    colorCode: string;

    @ApiPropertyOptional({ example: 'Used for educational or productive activities' })
    @IsString()
    @IsOptional()
    description: string;
}

export class UpdatePurposeTagDto {
    @ApiPropertyOptional({ example: 'Learning' })
    @IsString()
    @IsOptional()
    tagName: string;

    @ApiPropertyOptional({ example: '#4CAF50' })
    @IsHexColor()
    @IsOptional()
    colorCode: string;

    @ApiPropertyOptional({ example: 'Used for educational or productive activities' })
    @IsString()
    @IsOptional()
    description: string;
}