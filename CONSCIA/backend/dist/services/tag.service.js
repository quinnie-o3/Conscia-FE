"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const purpose_tag_schema_1 = require("../schemas/purpose-tag.schema");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
let TagService = class TagService {
    tagModel;
    constructor(tagModel) {
        this.tagModel = tagModel;
    }
    async getAllTags() {
        const tags = await this.tagModel.find();
        return tags.map((t) => ({
            tagId: t._id,
            tagName: t.tagName,
            colorCode: t.colorCode,
            emoji: t.emoji,
            description: t.description,
            isDefault: t.isDefault,
        }));
    }
    async getTagById(tagId) {
        if (!tagId) {
            throw new custom_exceptions_1.InvalidInputException('tagId', 'Tag ID is required');
        }
        const tag = await this.tagModel.findById(tagId).exec();
        if (!tag) {
            throw new custom_exceptions_1.TagNotFoundException(tagId);
        }
        return tag;
    }
    async initializeDefaultTags() {
        const defaultTags = [
            {
                tagName: 'Study',
                colorCode: '#4CAF50',
                emoji: '📚',
                description: 'Learning and education',
            },
            {
                tagName: 'Work',
                colorCode: '#2196F3',
                emoji: '💼',
                description: 'Work and productivity',
            },
            {
                tagName: 'Entertainment',
                colorCode: '#FF9800',
                emoji: '🎬',
                description: 'Movies, games, entertainment',
            },
            {
                tagName: 'Social',
                colorCode: '#E91E63',
                emoji: '👥',
                description: 'Social media apps',
            },
            {
                tagName: 'Mindless Scrolling',
                colorCode: '#9C27B0',
                emoji: '🔄',
                description: 'Mindless scrolling',
            },
            {
                tagName: 'Rest',
                colorCode: '#00BCD4',
                emoji: '😴',
                description: 'Rest and relaxation',
            },
            {
                tagName: 'Communication',
                colorCode: '#FFC107',
                emoji: '💬',
                description: 'Messaging and calls',
            },
            {
                tagName: 'Other',
                colorCode: '#757575',
                emoji: '❓',
                description: 'Other purposes',
            },
        ];
        for (const tagData of defaultTags) {
            const existing = await this.tagModel.findOne({
                tagName: tagData.tagName,
            });
            if (!existing) {
                await this.tagModel.create({
                    ...tagData,
                    isDefault: true,
                });
            }
        }
        return { message: 'Default tags initialized' };
    }
    async createTag(tagName, colorCode, description, emoji) {
        const existing = await this.tagModel.findOne({ tagName });
        if (existing) {
            throw new Error(`Tag with name ${tagName} already exists`);
        }
        const newTag = await this.tagModel.create({
            tagName,
            colorCode,
            description,
            isDefault: false,
            emoji: emoji || '',
        });
        return {
            tagId: newTag._id,
            tagName: newTag.tagName,
            colorCode: newTag.colorCode,
            emoji: newTag.emoji,
            description: newTag.description,
            isDefault: newTag.isDefault,
        };
    }
    async updateTag(tagId, updateData) {
        const updatedTag = await this.tagModel.findByIdAndUpdate(tagId, { $set: updateData }, { new: true });
        if (!updatedTag) {
            throw new Error('Tag not found');
        }
        return {
            tagId: updatedTag._id,
            tagName: updatedTag.tagName,
            colorCode: updatedTag.colorCode,
            emoji: updatedTag.emoji,
            description: updatedTag.description,
            isDefault: updatedTag.isDefault,
        };
    }
    async deleteTag(tagId) {
        const tag = await this.tagModel.findByIdAndDelete(tagId).exec();
        if (!tag) {
            throw new custom_exceptions_1.TagNotFoundException(tagId);
        }
        return tag;
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(purpose_tag_schema_1.PurposeTag.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TagService);
//# sourceMappingURL=tag.service.js.map