import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Reminder extends Document {
    userId: string;
    type: string;
    conditionValue: number;
    message: string;
    isActive: boolean;
    createdAt: Date;
}
export declare const ReminderSchema: MongooseSchema<Reminder, import("mongoose").Model<Reminder, any, any, any, (Document<unknown, any, Reminder, any, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Reminder, any, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, Reminder>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reminder, Document<unknown, {}, Reminder, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    conditionValue?: import("mongoose").SchemaDefinitionProperty<number, Reminder, Document<unknown, {}, Reminder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Reminder>;
