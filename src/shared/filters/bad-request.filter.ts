import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';
import { commonError } from 'src/errors/constant/common.constant';
import data from 'src/errors/data/index.data';
import { Error } from 'src/shared/types/error.type';

type Constraint = {
  constraint: string;
  property: string;
};

type ExceptionRes = {
  message: Constraint[];
};

type TargetConstructor = {
  resource: string;
};

@Catch(BadRequestException)
export class BadRequestExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse() as ExceptionRes | Error;
    const errors: Error[] = [];

    // using for validate dto
    if (exceptionRes.message) {
      const messages = exceptionRes.message as ValidationError[];
      errors.push(
        ...messages.reduce((arr, { constraints, target, property }) => {
          const code = commonError[`${Object.keys(constraints)[0]}`];
          // đặt tên commonError giống với constraints
          arr.push({
            resource: (target.constructor as unknown as TargetConstructor)
              .resource,
            field: property,
            code,
            message: data[code],
          });

          return arr;
        }, []),
      );
    } else {
      // using for throw service
      const { resource, field, code } = exceptionRes as Error;

      errors.push({
        resource,
        field,
        code,
        message: data[code],
      });
    }

    response.status(status).json({
      success: false,
      errors,
    });
  }
}
