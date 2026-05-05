import { TagService } from '../services/tag.service';
export declare class TagController {
    private tagService;
    constructor(tagService: TagService);
    getAllTags(): Promise<{
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
    initializeDefaultTags(): Promise<{
        success: boolean;
        data: {
            message: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
}
