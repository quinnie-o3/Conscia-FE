import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid email or password');
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found');
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid or expired token');
  }
}

export class InvalidInputException extends BadRequestException {
  constructor(field: string, reason: string) {
    super(`Invalid ${field}: ${reason}`);
  }
}

export class AppNotFoundException extends NotFoundException {
  constructor(appId: string) {
    super(`Application with ID ${appId} not found`);
  }
}

export class SessionNotFoundException extends NotFoundException {
  constructor(sessionId: string) {
    super(`Session with ID ${sessionId} not found`);
  }
}

export class GoalNotFoundException extends NotFoundException {
  constructor(goalId: string) {
    super(`Goal with ID ${goalId} not found`);
  }
}

export class ReminderNotFoundException extends NotFoundException {
  constructor(reminderId: string) {
    super(`Reminder with ID ${reminderId} not found`);
  }
}

export class TagNotFoundException extends NotFoundException {
  constructor(tagId: string) {
    super(`Tag with ID ${tagId} not found`);
  }
}

export class UnauthorizedAccessException extends UnauthorizedException {
  constructor(resource: string = 'resource') {
    super(`This ${resource} does not belong to you`);
  }
}

export class DeviceNotFoundException extends NotFoundException {
  constructor(deviceId: string) {
    super(`Device with ID ${deviceId} not found`);
  }
}
