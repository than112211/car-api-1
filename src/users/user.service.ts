import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userError } from 'src/errors/constant/user.constant';
import { Token, User } from 'src/users/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  IDataUser,
  IPayloadToken,
  IReturnLogin,
  IReturnRefreshToken,
  IUser,
} from './user.type';
import { JwtService } from '@nestjs/jwt';
import { ENV } from 'src/constant/constant.env';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(user: IUser): Promise<User> {
    const data = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (data) {
      throw new BadRequestException(userError.isExistEmail);
    } else {
      return this.userRepository.save(user);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const data = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (data) {
      return data;
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }

  async updatePassword(id: string, password: string): Promise<UpdateResult> {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (data) {
      return this.userRepository.update(id, { password });
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (data) {
      return this.userRepository.delete(id);
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }

  async login(user: IUser): Promise<IReturnLogin> {
    const data = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (data) {
      if (data.password === user.password) {
        const access_token = await this.jwtService.signAsync(data.id);
        const refresh_token = await this.jwtService.signAsync(data.id, {
          expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRED,
        });

        // lưu token vào db
        await this.tokenRepository.save({
          user: data,
          access_token: access_token,
          refresh_token: refresh_token,
        });

        return {
          ...data,
          access_token: access_token,
          refresh_token: refresh_token,
        };
      } else throw new UnauthorizedException(userError.isWrongPassword);
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }

  async refreshToken(refreshToken: string): Promise<IReturnRefreshToken> {
    try {
      const data = await this.jwtService.verifyAsync(refreshToken);
      const payload: IDataUser = {
        id: data.id,
        email: data.email,
        password: data.password,
        admin: data.admin,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error.expiredAt)
        throw new UnauthorizedException(userError.isExpiredJWT);
      else throw new UnauthorizedException(userError.unauthorize);
    }
  }
}
