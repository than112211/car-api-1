import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { IPagination } from '../types/common.type';

interface ClassConstructor {
  new (...args: any[]);
}

export interface ResponseController {
  message: string;
  data?: any;
  pagination?: IPagination;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor
  implements NestInterceptor<ResponseController>
{
  constructor(private dto: any) {}

  intercept(
    _context: ExecutionContext,
    handler: CallHandler,
  ): Observable<ResponseController> {
    return handler.handle().pipe(
      map((data: ResponseController) => {
        throw new HttpException(
          {
            success: true,
            message: data.message || '',
            data:
              plainToInstance(this.dto, data.data, {
                excludeExtraneousValues: true,
              }) || null,
            pagination: data.pagination || undefined,
          },
          HttpStatus.OK,
        );
      }),
    );
  }
}
