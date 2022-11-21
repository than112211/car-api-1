import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseController {
  message: string;
  data?: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseController>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseController> {
    return next.handle().pipe(
      map((data) => {
        throw new HttpException(
          {
            success: true,
            message: data.message || '',
            data: data.data || {},
          },
          HttpStatus.OK,
        );
      }),
    );
  }
}
