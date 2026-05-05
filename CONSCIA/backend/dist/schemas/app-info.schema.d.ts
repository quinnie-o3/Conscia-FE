import { Document } from 'mongoose';
export declare class AppInfo extends Document {
    packageName: string;
    appName: string;
    appCategory: string;
    iconUrl: string;
    isSystemApp: boolean;
}
export declare const AppInfoSchema: import("mongoose").Schema<AppInfo, import("mongoose").Model<AppInfo, any, any, any, (Document<unknown, any, AppInfo, any, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, AppInfo, any, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, AppInfo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AppInfo, Document<unknown, {}, AppInfo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, AppInfo, Document<unknown, {}, AppInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    packageName?: import("mongoose").SchemaDefinitionProperty<string, AppInfo, Document<unknown, {}, AppInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appName?: import("mongoose").SchemaDefinitionProperty<string, AppInfo, Document<unknown, {}, AppInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appCategory?: import("mongoose").SchemaDefinitionProperty<string, AppInfo, Document<unknown, {}, AppInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    iconUrl?: import("mongoose").SchemaDefinitionProperty<string, AppInfo, Document<unknown, {}, AppInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isSystemApp?: import("mongoose").SchemaDefinitionProperty<boolean, AppInfo, Document<unknown, {}, AppInfo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AppInfo>;
