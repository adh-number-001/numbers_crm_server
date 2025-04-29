import { BadRequestException, Injectable } from '@nestjs/common';

import { UserTermsOfUseRepository } from '../repository/user-terms-of-use.repository';
import { TermsOfUseRepository } from '../../terms-of-use/repository/terms-of-use.repository';

@Injectable()
export class UserTermsOfUseService {
  constructor(
    private readonly userTermsOfUseRepository: UserTermsOfUseRepository,
    private readonly termsOfUseRepository: TermsOfUseRepository,
  ) {}

  async createUserTermsOfUse(userId: number, termsOfUseIdList: number[]) {
    const requireTermsOfUseIdList =
      await this.termsOfUseRepository.getRequireTermsOfUseIdList();
    // 필수 동의항목 존재 여부 확인
    this.validateRequireTermsOfUse(termsOfUseIdList, requireTermsOfUseIdList);

    await this.userTermsOfUseRepository.createUserTermsOfUseList(
      userId,
      termsOfUseIdList,
    );
  }

  validateRequireTermsOfUse(
    termsOfUseIdList: number[],
    requireTermsOfUseIdList: number[],
  ) {
    const requireChecked = requireTermsOfUseIdList.every((item) =>
      termsOfUseIdList.includes(item),
    );
    if (!requireChecked) {
      throw new BadRequestException('필수 동의항목이 누락되었습니다.');
    }
  }
}
