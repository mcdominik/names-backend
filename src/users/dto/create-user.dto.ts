import { IsEmail, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDtoFromFrontend {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  accountType: Role;
}

export class CreateUserDto {
  email: string;
  passwordHash: string;
  role: Role;
}
