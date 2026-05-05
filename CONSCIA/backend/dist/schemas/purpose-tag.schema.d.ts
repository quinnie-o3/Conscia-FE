import { Document } from 'mongoose';
export declare class PurposeTag extends Document {
    tagName: string;
    colorCode: string;
    emoji: string;
    description: string;
    isDefault: boolean;
    category: string;
}
export declare const PurposeTagSchema: import("mongoose").Schema<PurposeTag, import("mongoose").Model<PurposeTag, any, any, any, (Document<unknown, any, PurposeTag, any, import("mongoose").DefaultSchemaOptions> & PurposeTag & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, PurposeTag, any, import("mongoose").DefaultSchemaOptions> & PurposeTag & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, PurposeTag>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PurposeTag, Document<unknown, {}, PurposeTag, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tagName?: import("mongoose").SchemaDefinitionProperty<string, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    colorCode?: import("mongoose").SchemaDefinitionProperty<string, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    emoji?: import("mongoose").SchemaDefinitionProperty<string, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDefault?: import("mongoose").SchemaDefinitionProperty<boolean, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, PurposeTag, Document<unknown, {}, PurposeTag, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, PurposeTag>;
