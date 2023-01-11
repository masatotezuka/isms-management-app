import { IsNotEmpty, IsString, IsEmail} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  adminName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
