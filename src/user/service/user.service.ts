import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateLoginId(loginId: string) {
    const user = await this.userRepository.getUserByLoginId(loginId);
    const isAvailable = !user;

    return isAvailable;
  }

  async getLoginIdListByPhoneNumber(phoneNumber: string) {
    const { loginIdList } =
      await this.userRepository.getLoginIdListByPhoneNumber(phoneNumber);

    return { loginIdList: loginIdList.map((item) => item.loginId) };
  }

  async updateUserPassword(loginId: string, password: string) {
    const { userId } = await this.userRepository.getUserIdByLoginId(loginId);

    const hashPassword = await bcrypt.hash(password, 12);

    return this.userRepository.updateUserPassword(userId, hashPassword);
  }
}
