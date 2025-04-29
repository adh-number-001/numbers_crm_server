import { Injectable } from '@nestjs/common';

import { TermsOfUseRepository } from '../repository/terms-of-use.repository';

@Injectable()
export class TermsOfUseService {
  constructor(private readonly termsOfUseRepository: TermsOfUseRepository) {}

  async getTermsOfUseList() {
    const termsOfUseList = await this.termsOfUseRepository.getTermsOfUseList();

    return termsOfUseList;
  }
}
