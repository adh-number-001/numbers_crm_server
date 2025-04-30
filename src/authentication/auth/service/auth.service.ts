import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthEnum } from '@common/util/enum/auth-enum';

import { AuthRepository } from '../repository/auth.repository';
import { RegisterDeviceInfo } from '../type';
import { UserRepository } from '../../../user/repository/user.repository';
import { RefreshTokenService } from '../../token/service/refresh-token.service';
import { AccessTokenService } from '../../token/service/access-token.service';
import { UserDeviceRepository } from '../../../user-device/repository/user-device.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly userDeviceRepository: UserDeviceRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly accessTokenService: AccessTokenService,
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

  async login(
    loginId: string,
    password: string,
    deviceId: string,
    phoneNumber: string,
  ) {
    const user = await this.userRepository.validateLoginIdGetUser(loginId);

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다');
    }

    const userId = user.id;

    // device 인증 여부 확인
    const { userDeviceId } =
      await this.userDeviceRepository.getUserDeviceIdByUserIdAndDeviceIdAndPhoneNumber(
        userId,
        deviceId,
        phoneNumber,
      );

    const refreshToken = this.createRefreshToken(userId, userDeviceId);
    const hashedRefreshToken =
      this.refreshTokenService.hashRefreshToken(refreshToken);
    await this.userDeviceRepository.updateRefreshToken(
      userDeviceId,
      hashedRefreshToken,
    );

    const accessToken = this.createAccessToken(userId, userDeviceId);

    return { accessToken, refreshToken };
  }

  createRefreshToken(userId: number, userDeviceId: number) {
    return this.refreshTokenService.createRefreshToken({
      userId,
      userDeviceId,
    });
  }

  createAccessToken(userId: number, userDeviceId: number) {
    return this.accessTokenService.createAccessToken({
      userId,
      userDeviceId,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const { userId, userDeviceId } =
      await this.refreshTokenService.validateRefreshToken(refreshToken);

    const hashedRefreshToken =
      this.refreshTokenService.hashRefreshToken(refreshToken);

    await this.userDeviceRepository.validateRefreshTokenByUserDeviceIdAndRefreshToken(
      userDeviceId,
      hashedRefreshToken,
    );

    const accessToken = this.accessTokenService.createAccessToken({
      userId,
      userDeviceId,
    });

    return { accessToken };
  }
}
