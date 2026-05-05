import { IsOptional, IsString } from 'class-validator';

export class RegisterDeviceDto {
  @IsString()
  anonymousUserId: string;

  @IsString()
  deviceId: string;

  @IsOptional()
  @IsString()
  deviceName?: string;

  @IsOptional()
  @IsString()
  osVersion?: string;
}