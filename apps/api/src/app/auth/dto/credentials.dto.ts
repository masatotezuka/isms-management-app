import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
