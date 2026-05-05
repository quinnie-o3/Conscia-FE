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
exports.UpdateAppDto = exports.CreateAppBatchDto = exports.CreateAppDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAppDto {
    packageName;
    appName;
    category;
    iconReference;
}
exports.CreateAppDto = CreateAppDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'com.example.app' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppDto.prototype, "packageName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Example App' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppDto.prototype, "appName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Productivity' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/icon.png' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAppDto.prototype, "iconReference", void 0);
class CreateAppBatchDto {
    apps;
}
exports.CreateAppBatchDto = CreateAppBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateAppDto] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAppBatchDto.prototype, "apps", void 0);
class UpdateAppDto {
    appName;
    category;
    iconReference;
}
exports.UpdateAppDto = UpdateAppDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Example App' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAppDto.prototype, "appName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Productivity' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAppDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/icon.png' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAppDto.prototype, "iconReference", void 0);
//# sourceMappingURL=app.dto.js.map