import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from 'src/constant/constant.env';
import { UserController } from 'src/users/user.controller';
import { Token, User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      global: true,
      secret: ENV.JWT_SECRET,
      signOptions: { expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRED },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
