import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  getDecodedJwtPayload(token: string) {
    try {
      const payload = decode(token, { json: true });
      if (!payload) {
        throw new InternalServerErrorException('jwt decode에 실패하였습니다.');
      }

      return payload;
    } catch (error) {
      throw new InternalServerErrorException('jwt decode에 실패하였습니다.');
    }
  }
}
