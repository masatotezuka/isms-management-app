import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
