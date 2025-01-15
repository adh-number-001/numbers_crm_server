import { ValidationError, ValidationPipe } from '@nestjs/common';

import { RequestValidationException } from '@common/exception/request-validation.exception';

export default function validationPipeConfig() {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      if (!errors[0].constraints) {
        throw new RequestValidationException('Invalid Request Error');
      }

      const errorMessage =
        errors[0].constraints[Object.keys(errors[0].constraints)[0]];
      throw new RequestValidationException(errorMessage);
    },
  });
}
