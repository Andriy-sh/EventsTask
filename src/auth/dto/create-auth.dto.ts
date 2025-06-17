import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
