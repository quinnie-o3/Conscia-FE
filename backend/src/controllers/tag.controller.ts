import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { JwtGuard } from '../guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('tags')
export class TagController {
    constructor(private tagService: TagService) { }

    /**
     * GET /tags
     * Get all tags
     */
    @Get()
    async getAllTags() {
        try {
            const result = await this.tagService.getAllTags();
            return {
                success: true,
                data: result,
                message: 'Tags retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get tags',
            };
        }
    }

    /**
     * POST /tags/initialize
     * Initialize default tags
     */
    @Post('initialize')
    async initializeDefaultTags() {
        try {
            const result = await this.tagService.initializeDefaultTags();
            return {
                success: true,
                data: result,
                message: 'Default tags initialized successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to initialize tags',
            };
        }
    }
}