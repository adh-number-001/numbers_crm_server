import { Controller, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtUserRequestDto } from '@common/dto';
import { UserJwtAuth } from '@common/util/guards';
import { Jwt } from '@common/decorator';

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
  @UserJwtAuth()
  @ApiOperation({
    summary: '유저 이용약관 동의 기록 생성 API',
  })
  @ApiBadRequestResponse({ description: '필수 동의항목이 누락되었습니다.' })
  @ApiCreatedResponse({
    type: CreateUserTermsOfUseResponseDto,
  })
  async createUserTermsOfUse(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
    @Query() requestDto: CreateUserTermsOfUseRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const { termsOfUseIdList } = requestDto;
    await this.userTermsOfUseService.createUserTermsOfUse(
      userId,
      termsOfUseIdList,
    );

    return new CreateUserTermsOfUseResponseDto(userId);
  }
}
