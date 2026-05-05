import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Device extends Document {
    userId: string;
    deviceName: string;
    deviceType: string;
    osVersion: string;
    deviceModel: string;
    androidId: string;
    isActive: boolean;
    lastSyncAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DeviceSchema: MongooseSchema<Device, import("mongoose").Model<Device, any, any, any, (Document<unknown, any, Device, any, import("mongoose").DefaultSchemaOptions> & Device & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Device, any, import("mongoose").DefaultSchemaOptions> & Device & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, Device>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Device, Document<unknown, {}, Device, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deviceName?: import("mongoose").SchemaDefinitionProperty<string, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deviceType?: import("mongoose").SchemaDefinitionProperty<string, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    osVersion?: import("mongoose").SchemaDefinitionProperty<string, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deviceModel?: import("mongoose").SchemaDefinitionProperty<string, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    androidId?: import("mongoose").SchemaDefinitionProperty<string, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    lastSyncAt?: import("mongoose").SchemaDefinitionProperty<Date, Device, Document<unknown, {}, Device, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Device>;
