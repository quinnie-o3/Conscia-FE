import { BadRequestException, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
export declare class UserAlreadyExistsException extends ConflictException {
    constructor(email: string);
}
export declare class InvalidCredentialsException extends UnauthorizedException {
    constructor();
}
export declare class UserNotFoundException extends NotFoundException {
    constructor();
}
export declare class InvalidTokenException extends UnauthorizedException {
    constructor();
}
export declare class InvalidInputException extends BadRequestException {
    constructor(field: string, reason: string);
}
export declare class AppNotFoundException extends NotFoundException {
    constructor(appId: string);
}
export declare class SessionNotFoundException extends NotFoundException {
    constructor(sessionId: string);
}
export declare class GoalNotFoundException extends NotFoundException {
    constructor(goalId: string);
}
export declare class ReminderNotFoundException extends NotFoundException {
    constructor(reminderId: string);
}
export declare class TagNotFoundException extends NotFoundException {
    constructor(tagId: string);
}
export declare class UnauthorizedAccessException extends UnauthorizedException {
    constructor(resource?: string);
}
export declare class DeviceNotFoundException extends NotFoundException {
    constructor(deviceId: string);
}
