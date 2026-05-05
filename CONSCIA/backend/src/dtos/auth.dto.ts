import { IsEmail, MinLength, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    fullName: string;

    @ApiProperty({ example: 'strongPassword123' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'strongPassword123' })
    @IsString()
    @MinLength(6)
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'refresh-token-value' })
    @IsString()
    refreshToken: string;
}