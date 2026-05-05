import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Goal extends Document {
    userId: string;
    goalName: string;
    goalType: string;
    targetValue: number;
    targetUnit: string;
    periodType: string;
    appId: string;
    tagId: string;
    currentProgress: number;
    status: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const GoalSchema: MongooseSchema<Goal, import("mongoose").Model<Goal, any, any, any, (Document<unknown, any, Goal, any, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Goal, any, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, Goal>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Goal, Document<unknown, {}, Goal, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appId?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tagId?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    goalName?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    goalType?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    targetValue?: import("mongoose").SchemaDefinitionProperty<number, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    targetUnit?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    periodType?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currentProgress?: import("mongoose").SchemaDefinitionProperty<number, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Goal, Document<unknown, {}, Goal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Goal>;
