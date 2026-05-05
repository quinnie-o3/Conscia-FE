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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurposeTagDto = exports.CreatePurposeTagDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePurposeTagDto {
    tagName;
    colorCode;
    description;
}
exports.CreatePurposeTagDto = CreatePurposeTagDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Learning' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePurposeTagDto.prototype, "tagName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#4CAF50' }),
    (0, class_validator_1.IsHexColor)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePurposeTagDto.prototype, "colorCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Used for educational or productive activities' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePurposeTagDto.prototype, "description", void 0);
class UpdatePurposeTagDto {
    tagName;
    colorCode;
    description;
}
exports.UpdatePurposeTagDto = UpdatePurposeTagDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Learning' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePurposeTagDto.prototype, "tagName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#4CAF50' }),
    (0, class_validator_1.IsHexColor)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePurposeTagDto.prototype, "colorCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Used for educational or productive activities' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePurposeTagDto.prototype, "description", void 0);
//# sourceMappingURL=purposetag.dto.js.map