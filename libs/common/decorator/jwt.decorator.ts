import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtUserRequestDto } from '@common/dto';

export const Jwt = createParamDecorator(
  (data: keyof JwtUserRequestDto, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new UnauthorizedException();
    }

    return data ? user?.[data] : user;
  },
);
