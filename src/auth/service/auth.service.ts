import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { AuthRepository } from '../repository/auth.repository';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async register(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) {
    await this.userRepository.validateEmail(email);
    await this.userRepository.validatePhoneNumber(phoneNumber);

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await this.authRepository.register(
      email,
      hashPassword,
      name,
      phoneNumber,
    );

    return { userId: user.id };
  }
}
