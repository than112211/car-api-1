import { Expose } from 'class-transformer';
import { IsEmail, IsJWT, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  static resource = User.name;

  @IsEmail()
  @MaxLength(50)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UserReturnDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  admin: boolean;
}

export class UserReturnLoginDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}

export class UserRefreshTokenDto {
  @IsJWT()
  refresh_token: string;
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
