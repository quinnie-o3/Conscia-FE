import { TagService } from '../services/tag.service';
import { CreatePurposeTagDto, UpdatePurposeTagDto } from '../dtos/purposetag.dto';
export declare class PurposeTagController {
    private tagService;
    constructor(tagService: TagService);
    getAllPurposeTags(): Promise<{
        success: boolean;
        data: {
            tagId: import("mongoose").Types.ObjectId;
            tagName: string;
            colorCode: string;
            emoji: string;
            description: string;
            isDefault: boolean;
        }[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getPurposeTagById(tagId: string): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/purpose-tag.schema").PurposeTag, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/purpose-tag.schema").PurposeTag & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    createPurposeTag(createPurposeTagDto: CreatePurposeTagDto, user: any): Promise<{
        success: boolean;
        data: {
            tagId: import("mongoose").Types.ObjectId;
            tagName: string;
            colorCode: string;
            emoji: string;
            description: string;
            isDefault: boolean;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    updatePurposeTag(tagId: string, updatePurposeTagDto: UpdatePurposeTagDto, user: any): Promise<{
        success: boolean;
        data: {
            tagId: import("mongoose").Types.ObjectId;
            tagName: string;
            colorCode: string;
            emoji: string;
            description: string;
            isDefault: boolean;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    deletePurposeTag(tagId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/purpose-tag.schema").PurposeTag, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/purpose-tag.schema").PurposeTag & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    seedDefaultTags(user: any): Promise<{
        success: boolean;
        data: {
            tagId: import("mongoose").Types.ObjectId;
            tagName: string;
            colorCode: string;
            emoji: string;
            description: string;
            isDefault: boolean;
        }[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
}
