import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { ApplicationException } from '@common/exception/application.exception';
import { ErrorResponseDto } from '@common/dto/error-response.dto';

function handleApplicationException<T extends ApplicationException>(
  exception: T,
  req: Request,
  res: Response,
) {
  const { status, code, message } = exception;

  res.status(status).json(
    ErrorResponseDto.from({
      status,
      code,
      message,
      path: req.url,
    }),
  );
}

function unHandleHttpException<T extends HttpException>(
  exception: T,
  req: Request,
  res: Response,
) {
  const status = exception.getStatus();

  res.status(status).json(
    ErrorResponseDto.from({
      status,
      code: 'UNKNOWN_HTTP_EXCEPTION',
      message: exception.message,
      path: req.url,
    }),
  );
}

function unHandleException(req: Request, res: Response) {
  res.status(500).json(
    ErrorResponseDto.from({
      status: 500,
      code: 'UNKNOWN_ERROR',
      message: '알 수 없는 에러',
      path: req.url,
    }),
  );
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(exception);

    if (exception instanceof ApplicationException) {
      handleApplicationException(exception, request, response);
    } else if (exception instanceof HttpException) {
      unHandleHttpException(exception, request, response);
    } else {
      unHandleException(request, response);
    }
  }
}
