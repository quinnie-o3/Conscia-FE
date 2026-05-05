import { Model } from 'mongoose';
import { PurposeTag } from '../schemas/purpose-tag.schema';
export declare class TagService {
    private tagModel;
    constructor(tagModel: Model<PurposeTag>);
    getAllTags(): Promise<{
        tagId: import("mongoose").Types.ObjectId;
        tagName: string;
        colorCode: string;
        emoji: string;
        description: string;
        isDefault: boolean;
    }[]>;
    getTagById(tagId: string): Promise<import("mongoose").Document<unknown, {}, PurposeTag, {}, import("mongoose").DefaultSchemaOptions> & PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    initializeDefaultTags(): Promise<{
        message: string;
    }>;
    createTag(tagName: string, colorCode: string, description: string, emoji?: string): Promise<{
        tagId: import("mongoose").Types.ObjectId;
        tagName: string;
        colorCode: string;
        emoji: string;
        description: string;
        isDefault: boolean;
    }>;
    updateTag(tagId: string, updateData: any): Promise<{
        tagId: import("mongoose").Types.ObjectId;
        tagName: string;
        colorCode: string;
        emoji: string;
        description: string;
        isDefault: boolean;
    }>;
    deleteTag(tagId: string): Promise<import("mongoose").Document<unknown, {}, PurposeTag, {}, import("mongoose").DefaultSchemaOptions> & PurposeTag & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
