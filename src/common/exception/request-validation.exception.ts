import { ApplicationException } from '@common/exception/application.exception';

export class RequestValidationException extends ApplicationException {
  constructor(message: string) {
    super(400, 'INVALID REQUEST', message);
  }
}
