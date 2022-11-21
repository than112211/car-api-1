import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { User } from './user.entity';

export class CreateUserDto {
  static resource = User.name;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordUserDto {
  static resource = User.name;

  @IsNotEmpty()
  password: string;
}

export class UserParamsDto {
  static resource = User.name;

  @IsUUID()
  id: string;
}

export class ResponseUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
