import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';
import {
    CreatePurposeTagDto,
    UpdatePurposeTagDto,
} from '../dtos/purposetag.dto';

@Controller('purpose-tags')
export class PurposeTagController {
    constructor(private tagService: TagService) { }

    @UseGuards(JwtGuard)
    @Get()
    async getAllPurposeTags() {
        try {
            const result = await this.tagService.getAllTags();
            return {
                success: true,
                data: result,
                message: 'Purpose tags retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get purpose tags',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get(':tagId')
    async getPurposeTagById(@Param('tagId') tagId: string) {
        try {
            const result = await this.tagService.getTagById(tagId);
            return {
                success: true,
                data: result,
                message: 'Purpose tag retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get purpose tag',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Post()
    async createPurposeTag(
        @Body() createPurposeTagDto: CreatePurposeTagDto,
        @CurrentUser() user: any,
    ) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can create purpose tags',
                    message: 'Unauthorized',
                };
            }

            const result = await this.tagService.createTag(
                createPurposeTagDto.tagName,
                createPurposeTagDto.colorCode,
                createPurposeTagDto.description,
            );
            return {
                success: true,
                data: result,
                message: 'Purpose tag created successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create purpose tag',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Put(':tagId')
    async updatePurposeTag(
        @Param('tagId') tagId: string,
        @Body() updatePurposeTagDto: UpdatePurposeTagDto,
        @CurrentUser() user: any,
    ) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can update purpose tags',
                    message: 'Unauthorized',
                };
            }

            const result = await this.tagService.updateTag(tagId, updatePurposeTagDto);
            return {
                success: true,
                data: result,
                message: 'Purpose tag updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update purpose tag',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':tagId')
    async deletePurposeTag(
        @Param('tagId') tagId: string,
        @CurrentUser() user: any,
    ) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can delete purpose tags',
                    message: 'Unauthorized',
                };
            }

            const result = await this.tagService.deleteTag(tagId);
            return {
                success: true,
                data: result,
                message: 'Purpose tag deleted successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete purpose tag',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Post('seed')
    async seedDefaultTags(@CurrentUser() user: any) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can seed tags',
                    message: 'Unauthorized',
                };
            }

            const defaultTags = [
                {
                    tagName: 'Study',
                    colorCode: '#4CAF50',
                    description: 'Time spent studying or learning',
                },
                {
                    tagName: 'Work',
                    colorCode: '#2196F3',
                    description: 'Time spent on work-related tasks',
                },
                {
                    tagName: 'Entertainment',
                    colorCode: '#FF9800',
                    description: 'Time spent on entertainment',
                },
                {
                    tagName: 'Social',
                    colorCode: '#E91E63',
                    description: 'Time spent on social media',
                },
                {
                    tagName: 'Rest',
                    colorCode: '#9C27B0',
                    description: 'Time spent resting',
                },
                {
                    tagName: 'Mindless Scrolling',
                    colorCode: '#F44336',
                    description: 'Time spent scrolling without purpose',
                },
            ];

            const results = await Promise.all(
                defaultTags.map((tag) =>
                    this.tagService.createTag(
                        tag.tagName,
                        tag.colorCode,
                        tag.description,
                    ),
                ),
            );

            return {
                success: true,
                data: results,
                message: 'Default purpose tags seeded successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to seed purpose tags',
            };
        }
    }
}