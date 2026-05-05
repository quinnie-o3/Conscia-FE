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
exports.GoalSchema = exports.Goal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Goal = class Goal extends mongoose_2.Document {
    userId;
    goalName;
    goalType;
    targetValue;
    targetUnit;
    periodType;
    appId;
    tagId;
    currentProgress;
    status;
    startDate;
    endDate;
    createdAt;
    updatedAt;
};
exports.Goal = Goal;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", String)
], Goal.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "goalName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Goal.prototype, "goalType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Goal.prototype, "targetValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'MINUTES' }),
    __metadata("design:type", String)
], Goal.prototype, "targetUnit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'DAILY' }),
    __metadata("design:type", String)
], Goal.prototype, "periodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'AppInfo' }),
    __metadata("design:type", String)
], Goal.prototype, "appId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'PurposeTag' }),
    __metadata("design:type", String)
], Goal.prototype, "tagId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Goal.prototype, "currentProgress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'ACTIVE' }),
    __metadata("design:type", String)
], Goal.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Goal.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Goal.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Goal.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Goal.prototype, "updatedAt", void 0);
exports.Goal = Goal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Goal);
exports.GoalSchema = mongoose_1.SchemaFactory.createForClass(Goal);
//# sourceMappingURL=goal.schema.js.map