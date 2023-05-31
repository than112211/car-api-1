import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import data from 'src/errors/data/index.data';
import { Error } from 'src/shared/types/error.type';

type Constraint = {
  constraint: string;
  property: string;
};

type ExceptionRes = {
  message: Constraint[];
};

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter
  implements ExceptionFilter<UnauthorizedException>
{
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse() as ExceptionRes | Error;
    const errors: Error[] = [];

    // using for throw service
    const { resource, field, code } = exceptionRes as Error;

    errors.push({
      resource,
      field,
      code,
      message: data[code],
    });

    response.status(status).json({
      success: false,
      errors,
    });
  }
}
