import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurposeTag } from '../schemas/purpose-tag.schema';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(PurposeTag.name) private tagModel: Model<PurposeTag>,
    ) { }

    /**
     * Get all tags
     */
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

    /**
     * Get tag by ID
     */
    async getTagById(tagId: string) {
        const tag = await this.tagModel.findById(tagId);
        if (!tag) {
            throw new Error('Tag not found');
        }

        return {
            tagId: tag._id,
            tagName: tag.tagName,
            colorCode: tag.colorCode,
            emoji: tag.emoji,
            description: tag.description,
        };
    }

    /**
     * Initialize default tags
     */
    async initializeDefaultTags() {
        const defaultTags = [
            { tagName: 'Study', colorCode: '#4CAF50', emoji: '📚', description: 'Learning and education' },
            { tagName: 'Work', colorCode: '#2196F3', emoji: '💼', description: 'Work and productivity' },
            { tagName: 'Entertainment', colorCode: '#FF9800', emoji: '🎬', description: 'Movies, games, entertainment' },
            { tagName: 'Social', colorCode: '#E91E63', emoji: '👥', description: 'Social media apps' },
            { tagName: 'Mindless Scrolling', colorCode: '#9C27B0', emoji: '🔄', description: 'Mindless scrolling' },
            { tagName: 'Rest', colorCode: '#00BCD4', emoji: '😴', description: 'Rest and relaxation' },
            { tagName: 'Communication', colorCode: '#FFC107', emoji: '💬', description: 'Messaging and calls' },
            { tagName: 'Other', colorCode: '#757575', emoji: '❓', description: 'Other purposes' },
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
}