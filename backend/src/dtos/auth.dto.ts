import { IsEmail, MinLength, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    fullName: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class RefreshTokenDto {
    @IsString()
    refreshToken: string;
}