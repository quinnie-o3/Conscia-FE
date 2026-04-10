import { IsString, IsOptional } from 'class-validator';

export class CreateAppDto {
    @IsString()
    packageName: string;

    @IsString()
    appName: string;

    @IsString()
    category: string;

    @IsString()
    @IsOptional()
    iconReference: string;
}

export class CreateAppBatchDto {
    @IsString()
    apps: CreateAppDto[];
}

export class UpdateAppDto {
    @IsString()
    @IsOptional()
    appName: string;

    @IsString()
    @IsOptional()
    category: string;

    @IsString()
    @IsOptional()
    iconReference: string;
}