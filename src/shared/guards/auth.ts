import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { userError } from 'src/errors/constant/user.constant';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(userError.unauthorize);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      // check tồn tại user
      const user = await this.userRepository.findOne({
        where: {
          id: payload.id,
        },
        relations: {
          tokens: true,
        },
      });

      // check tồn tại token
      const isExistToken = user.tokens.some((tk) => tk.access_token === token);

      if (user && isExistToken) {
        request['user'] = user;

        return true;
      }
    } catch (error) {
      if (error.expiredAt)
        throw new UnauthorizedException(userError.isExpiredJWT);
      else throw new UnauthorizedException(userError.unauthorize);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
