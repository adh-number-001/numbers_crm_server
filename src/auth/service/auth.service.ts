import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthEnum } from '@common/util/enum/auth-enum';

import { AuthRepository } from '../repository/auth.repository';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async register(
    username: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    birthDate?: bigint,
    gender?: AuthEnum.GenderType,
  ) {
    await this.userRepository.validateUsername(username);
    await this.userRepository.validatePhoneNumber(phoneNumber);

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await this.authRepository.register(
      username,
      hashPassword,
      fullName,
      phoneNumber,
      birthDate,
      gender,
    );

    return { userId: user.id };
  }

  async login(username: string, password: string) {
    const user =
      await this.userRepository.validateUsernameGetHashPassword(username);

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다');
    }

    return { userId: user.id };
  }
}
