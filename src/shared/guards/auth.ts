import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class Auth implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const isAuthenticated = !!request;
    // code ..
    // if true => pass life cycle => interceptor
    // if false => return 403 Forbbiden

    //fake auth
    if (!isAuthenticated) {
      throw new UnauthorizedException('Unauthenticated');
    }

    return isAuthenticated;
  }
}
