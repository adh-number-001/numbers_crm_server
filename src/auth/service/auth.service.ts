import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthEnum } from '@common/util/enum/auth-enum';

import { AuthRepository } from '../repository/auth.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { DeviceRepository } from '../../device/repository/device.repository';
import { RegisterDeviceInfo } from '../type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly deviceRepisotry: DeviceRepository,
  ) {}

  async register(
    loginId: string,
    password: string,
    fullName: string,
    deviceInfo: RegisterDeviceInfo,
    birthDate: bigint,
    gender: AuthEnum.GenderType,
  ) {
    await this.userRepository.validateLoginId(loginId);

    const hashPassword = await bcrypt.hash(password, 12);

    const { id } = await this.authRepository.register(
      loginId,
      hashPassword,
      fullName,
      deviceInfo,
      birthDate,
      gender,
    );

    return { userId: id };
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
