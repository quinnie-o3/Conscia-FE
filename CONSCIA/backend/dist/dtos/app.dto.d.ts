export declare class CreateAppDto {
    packageName: string;
    appName: string;
    category: string;
    iconReference: string;
}
export declare class CreateAppBatchDto {
    apps: CreateAppDto[];
}
export declare class UpdateAppDto {
    appName: string;
    category: string;
    iconReference: string;
}
