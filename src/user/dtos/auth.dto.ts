import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @Matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'password must be longer than 5 characters' })
  password: string;
}
