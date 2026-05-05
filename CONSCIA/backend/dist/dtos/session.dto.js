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
exports.GetSessionsQueryDto = exports.ClassifySessionDto = exports.SyncSessionsBatchDto = exports.SyncSessionDto = exports.CreateSessionsBatchDto = exports.CreateSessionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSessionDto {
    deviceId;
    appId;
    startedAt;
    endedAt;
    date;
}
exports.CreateSessionDto = CreateSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'device-12345' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'com.example.app' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "appId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-04T08:30:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-04T09:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "endedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-04' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "date", void 0);
class CreateSessionsBatchDto {
    sessions;
}
exports.CreateSessionsBatchDto = CreateSessionsBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateSessionDto] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateSessionsBatchDto.prototype, "sessions", void 0);
class SyncSessionDto {
    externalId;
    deviceId;
    packageName;
    appName;
    startedAt;
    endedAt;
    durationSeconds;
    isClassified;
    tags;
}
exports.SyncSessionDto = SyncSessionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'external-12345' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SyncSessionDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'device-12345' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncSessionDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'com.example.android' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SyncSessionDto.prototype, "packageName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Example App' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SyncSessionDto.prototype, "appName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-04T08:30:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncSessionDto.prototype, "startedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-04T09:00:00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SyncSessionDto.prototype, "endedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1800 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SyncSessionDto.prototype, "durationSeconds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SyncSessionDto.prototype, "isClassified", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['Learning', 'Productivity'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SyncSessionDto.prototype, "tags", void 0);
class SyncSessionsBatchDto {
    sessions;
}
exports.SyncSessionsBatchDto = SyncSessionsBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SyncSessionDto] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SyncSessionsBatchDto.prototype, "sessions", void 0);
class ClassifySessionDto {
    tags;
    note;
}
exports.ClassifySessionDto = ClassifySessionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['Learning', 'Work'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ClassifySessionDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Focus session for study' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClassifySessionDto.prototype, "note", void 0);
class GetSessionsQueryDto {
    dateFrom;
    dateTo;
    appId;
    status;
    page = 1;
    limit = 20;
}
exports.GetSessionsQueryDto = GetSessionsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetSessionsQueryDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-04' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetSessionsQueryDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'com.example.app' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetSessionsQueryDto.prototype, "appId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'classified', enum: ['classified', 'unclassified'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetSessionsQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, minimum: 1, default: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetSessionsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20, minimum: 1, default: 20 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetSessionsQueryDto.prototype, "limit", void 0);
//# sourceMappingURL=session.dto.js.map