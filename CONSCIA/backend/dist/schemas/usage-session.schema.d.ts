import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class UsageSession extends Document {
    userId: string;
    deviceId: string;
    appId: string;
    externalId: string;
    packageName: string;
    appName: string;
    startedAt: Date;
    endedAt: Date;
    durationSeconds: number;
    sessionDate: Date;
    isCompleted: boolean;
    isClassified: boolean;
    tags: Array<any>;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UsageSessionSchema: MongooseSchema<UsageSession, import("mongoose").Model<UsageSession, any, any, any, (Document<unknown, any, UsageSession, any, import("mongoose").DefaultSchemaOptions> & UsageSession & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, UsageSession, any, import("mongoose").DefaultSchemaOptions> & UsageSession & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, UsageSession>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UsageSession, Document<unknown, {}, UsageSession, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    packageName?: import("mongoose").SchemaDefinitionProperty<string, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appName?: import("mongoose").SchemaDefinitionProperty<string, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deviceId?: import("mongoose").SchemaDefinitionProperty<string, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appId?: import("mongoose").SchemaDefinitionProperty<string, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    externalId?: import("mongoose").SchemaDefinitionProperty<string, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startedAt?: import("mongoose").SchemaDefinitionProperty<Date, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endedAt?: import("mongoose").SchemaDefinitionProperty<Date, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    durationSeconds?: import("mongoose").SchemaDefinitionProperty<number, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sessionDate?: import("mongoose").SchemaDefinitionProperty<Date, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isCompleted?: import("mongoose").SchemaDefinitionProperty<boolean, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isClassified?: import("mongoose").SchemaDefinitionProperty<boolean, UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<any[], UsageSession, Document<unknown, {}, UsageSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<UsageSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, UsageSession>;
