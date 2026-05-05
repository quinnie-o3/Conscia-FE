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
exports.UsageSessionSchema = exports.UsageSession = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsageSession = class UsageSession extends mongoose_2.Document {
    userId;
    deviceId;
    appId;
    externalId;
    packageName;
    appName;
    startedAt;
    endedAt;
    durationSeconds;
    sessionDate;
    isCompleted;
    isClassified;
    tags;
    createdAt;
    updatedAt;
};
exports.UsageSession = UsageSession;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", String)
], UsageSession.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Device', required: true }),
    __metadata("design:type", String)
], UsageSession.prototype, "deviceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'AppInfo' }),
    __metadata("design:type", String)
], UsageSession.prototype, "appId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true, sparse: true }),
    __metadata("design:type", String)
], UsageSession.prototype, "externalId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UsageSession.prototype, "packageName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UsageSession.prototype, "appName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], UsageSession.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UsageSession.prototype, "endedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], UsageSession.prototype, "durationSeconds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], UsageSession.prototype, "sessionDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UsageSession.prototype, "isCompleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UsageSession.prototype, "isClassified", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            tagId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'PurposeTag' },
            tagName: String,
            note: String,
            classifiedAt: Date,
        },
    ]),
    __metadata("design:type", Array)
], UsageSession.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UsageSession.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], UsageSession.prototype, "updatedAt", void 0);
exports.UsageSession = UsageSession = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UsageSession);
exports.UsageSessionSchema = mongoose_1.SchemaFactory.createForClass(UsageSession);
//# sourceMappingURL=usage-session.schema.js.map