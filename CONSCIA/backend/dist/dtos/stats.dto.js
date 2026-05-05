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
exports.InsightsQueryDto = exports.TrendQueryDto = exports.UsageByPurposeQueryDto = exports.TopAppsQueryDto = exports.ScreenTimeQueryDto = exports.PeriodEnum = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var PeriodEnum;
(function (PeriodEnum) {
    PeriodEnum["DAILY"] = "daily";
    PeriodEnum["WEEKLY"] = "weekly";
    PeriodEnum["MONTHLY"] = "monthly";
})(PeriodEnum || (exports.PeriodEnum = PeriodEnum = {}));
class ScreenTimeQueryDto {
    period = PeriodEnum.DAILY;
    date;
}
exports.ScreenTimeQueryDto = ScreenTimeQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PeriodEnum, default: PeriodEnum.DAILY }),
    (0, class_validator_1.IsEnum)(PeriodEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ScreenTimeQueryDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-04' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ScreenTimeQueryDto.prototype, "date", void 0);
class TopAppsQueryDto {
    period = PeriodEnum.DAILY;
    date;
    limit = 5;
}
exports.TopAppsQueryDto = TopAppsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PeriodEnum, default: PeriodEnum.DAILY }),
    (0, class_validator_1.IsEnum)(PeriodEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TopAppsQueryDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-04' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TopAppsQueryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TopAppsQueryDto.prototype, "limit", void 0);
class UsageByPurposeQueryDto {
    period = PeriodEnum.DAILY;
    date;
}
exports.UsageByPurposeQueryDto = UsageByPurposeQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PeriodEnum, default: PeriodEnum.DAILY }),
    (0, class_validator_1.IsEnum)(PeriodEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsageByPurposeQueryDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-04' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UsageByPurposeQueryDto.prototype, "date", void 0);
class TrendQueryDto {
    startDate;
    endDate;
}
exports.TrendQueryDto = TrendQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrendQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-07' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrendQueryDto.prototype, "endDate", void 0);
class InsightsQueryDto {
    period = PeriodEnum.DAILY;
    date;
}
exports.InsightsQueryDto = InsightsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: PeriodEnum, default: PeriodEnum.DAILY }),
    (0, class_validator_1.IsEnum)(PeriodEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsightsQueryDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-04' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsightsQueryDto.prototype, "date", void 0);
//# sourceMappingURL=stats.dto.js.map