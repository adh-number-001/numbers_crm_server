import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateLoginId(loginId: string) {
    const user = await this.userRepository.getUserByLoginId(loginId);
    const isAvailable = !user;

    return isAvailable;
  }
}
