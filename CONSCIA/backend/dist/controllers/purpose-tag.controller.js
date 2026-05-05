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
exports.PurposeTagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("../services/tag.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const purposetag_dto_1 = require("../dtos/purposetag.dto");
let PurposeTagController = class PurposeTagController {
    tagService;
    constructor(tagService) {
        this.tagService = tagService;
    }
    async getAllPurposeTags() {
        try {
            const result = await this.tagService.getAllTags();
            return {
                success: true,
                data: result,
                message: 'Purpose tags retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get purpose tags',
            };
        }
    }
    async getPurposeTagById(tagId) {
        try {
            const result = await this.tagService.getTagById(tagId);
            return {
                success: true,
                data: result,
                message: 'Purpose tag retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get purpose tag',
            };
        }
    }
    async createPurposeTag(createPurposeTagDto, user) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can create purpose tags',
                    message: 'Unauthorized',
                };
            }
            const result = await this.tagService.createTag(createPurposeTagDto.tagName, createPurposeTagDto.colorCode, createPurposeTagDto.description);
            return {
                success: true,
                data: result,
                message: 'Purpose tag created successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create purpose tag',
            };
        }
    }
    async updatePurposeTag(tagId, updatePurposeTagDto, user) {
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
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update purpose tag',
            };
        }
    }
    async deletePurposeTag(tagId, user) {
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
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete purpose tag',
            };
        }
    }
    async seedDefaultTags(user) {
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
            const results = await Promise.all(defaultTags.map((tag) => this.tagService.createTag(tag.tagName, tag.colorCode, tag.description)));
            return {
                success: true,
                data: results,
                message: 'Default purpose tags seeded successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to seed purpose tags',
            };
        }
    }
};
exports.PurposeTagController = PurposeTagController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurposeTagController.prototype, "getAllPurposeTags", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':tagId'),
    __param(0, (0, common_1.Param)('tagId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurposeTagController.prototype, "getPurposeTagById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purposetag_dto_1.CreatePurposeTagDto, Object]),
    __metadata("design:returntype", Promise)
], PurposeTagController.prototype, "createPurposeTag", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':tagId'),
    __param(0, (0, common_1.Param)('tagId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purposetag_dto_1.UpdatePurposeTagDto, Object]),
    __metadata("design:returntype", Promise)
], PurposeTagController.prototype, "updatePurposeTag", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':tagId'),
    __param(0, (0, common_1.Param)('tagId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurposeTagController.prototype, "deletePurposeTag", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('seed'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurposeTagController.prototype, "seedDefaultTags", null);
exports.PurposeTagController = PurposeTagController = __decorate([
    (0, common_1.Controller)('purpose-tags'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], PurposeTagController);
//# sourceMappingURL=purpose-tag.controller.js.map