import { Controller, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateUserTermsOfUseRequestDto,
  CreateUserTermsOfUseResponseDto,
} from '../dto';
import { UserTermsOfUseService } from '../service/user-terms-of-use.service';

@ApiTags('UserTermsOfUse')
@Controller('user-terms-of-use')
export class UserTermsOfUseController {
  constructor(private readonly userTermsOfUseService: UserTermsOfUseService) {}

  @Post('/')
  @ApiOperation({
    summary: '유저 이용약관 동의 기록 생성 API',
  })
  @ApiBadRequestResponse({ description: '필수 동의항목이 누락되었습니다.' })
  @ApiCreatedResponse({
    type: CreateUserTermsOfUseResponseDto,
  })
  async createUserTermsOfUse(
    @Query() requestDto: CreateUserTermsOfUseRequestDto,
  ) {
    const { userId, termsOfUseIdList } = requestDto;
    await this.userTermsOfUseService.createUserTermsOfUse(
      userId,
      termsOfUseIdList,
    );

    return new CreateUserTermsOfUseResponseDto(userId);
  }
}
