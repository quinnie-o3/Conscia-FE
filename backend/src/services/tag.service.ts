import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurposeTag } from '../schemas/purpose-tag.schema';
import {
  TagNotFoundException,
  InvalidInputException,
} from '../exceptions/custom.exceptions';

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
    if (!tagId) {
      throw new InvalidInputException('tagId', 'Tag ID is required');
    }

    const tag = await this.tagModel.findById(tagId).exec();
    if (!tag) {
      throw new TagNotFoundException(tagId);
    }
    return tag;
  }

  /**
   * Initialize default tags
   */
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

  /**
   * Create a new tag
   */
  async createTag(tagName: string, colorCode: string, description: string, emoji?: string) {
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

  /**
   * Update an existing tag
   */
  async updateTag(tagId: string, updateData: any) {
    const updatedTag = await this.tagModel.findByIdAndUpdate(
      tagId,
      { $set: updateData },
      { new: true },
    );

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

  /**
   * Delete a tag
   */
  async deleteTag(tagId: string) {
    const tag = await this.tagModel.findByIdAndDelete(tagId).exec();
    if (!tag) {
      throw new TagNotFoundException(tagId);
    }
    return tag;
  }
}
