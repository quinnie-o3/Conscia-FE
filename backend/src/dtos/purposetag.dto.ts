import { IsString, IsOptional, IsHexColor } from 'class-validator';

export class CreatePurposeTagDto {
    @IsString()
    tagName: string;

    @IsHexColor()
    @IsOptional()
    colorCode: string;

    @IsString()
    @IsOptional()
    description: string;
}

export class UpdatePurposeTagDto {
    @IsString()
    @IsOptional()
    tagName: string;

    @IsHexColor()
    @IsOptional()
    colorCode: string;

    @IsString()
    @IsOptional()
    description: string;
}