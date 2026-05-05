"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceNotFoundException = exports.UnauthorizedAccessException = exports.TagNotFoundException = exports.ReminderNotFoundException = exports.GoalNotFoundException = exports.SessionNotFoundException = exports.AppNotFoundException = exports.InvalidInputException = exports.InvalidTokenException = exports.UserNotFoundException = exports.InvalidCredentialsException = exports.UserAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistsException extends common_1.ConflictException {
    constructor(email) {
        super(`User with email ${email} already exists`);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
class InvalidCredentialsException extends common_1.UnauthorizedException {
    constructor() {
        super('Invalid email or password');
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
class UserNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('User not found');
    }
}
exports.UserNotFoundException = UserNotFoundException;
class InvalidTokenException extends common_1.UnauthorizedException {
    constructor() {
        super('Invalid or expired token');
    }
}
exports.InvalidTokenException = InvalidTokenException;
class InvalidInputException extends common_1.BadRequestException {
    constructor(field, reason) {
        super(`Invalid ${field}: ${reason}`);
    }
}
exports.InvalidInputException = InvalidInputException;
class AppNotFoundException extends common_1.NotFoundException {
    constructor(appId) {
        super(`Application with ID ${appId} not found`);
    }
}
exports.AppNotFoundException = AppNotFoundException;
class SessionNotFoundException extends common_1.NotFoundException {
    constructor(sessionId) {
        super(`Session with ID ${sessionId} not found`);
    }
}
exports.SessionNotFoundException = SessionNotFoundException;
class GoalNotFoundException extends common_1.NotFoundException {
    constructor(goalId) {
        super(`Goal with ID ${goalId} not found`);
    }
}
exports.GoalNotFoundException = GoalNotFoundException;
class ReminderNotFoundException extends common_1.NotFoundException {
    constructor(reminderId) {
        super(`Reminder with ID ${reminderId} not found`);
    }
}
exports.ReminderNotFoundException = ReminderNotFoundException;
class TagNotFoundException extends common_1.NotFoundException {
    constructor(tagId) {
        super(`Tag with ID ${tagId} not found`);
    }
}
exports.TagNotFoundException = TagNotFoundException;
class UnauthorizedAccessException extends common_1.UnauthorizedException {
    constructor(resource = 'resource') {
        super(`This ${resource} does not belong to you`);
    }
}
exports.UnauthorizedAccessException = UnauthorizedAccessException;
class DeviceNotFoundException extends common_1.NotFoundException {
    constructor(deviceId) {
        super(`Device with ID ${deviceId} not found`);
    }
}
exports.DeviceNotFoundException = DeviceNotFoundException;
//# sourceMappingURL=custom.exceptions.js.map