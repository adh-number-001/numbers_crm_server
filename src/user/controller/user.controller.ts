import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  GetLoginIdListByPhoneNumberRequestDto,
  GetLoginIdListByPhoneNumberResponseDto,
  ValidateLoginIdRequestDto,
  ValidateLoginIdResponseDto,
} from '../dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:loginId/validate-login-id')
  @ApiOperation({
    summary: 'Login Id 사용 가능 여부 확인 API',
    description: 'true: 사용 가능, false: 사용 불가능',
  })
  @ApiOkResponse({
    type: ValidateLoginIdResponseDto,
  })
  async validateLoginId(@Param() requestDto: ValidateLoginIdRequestDto) {
    const { loginId } = requestDto;

    const isAvailable = await this.userService.validateLoginId(loginId);

    return new ValidateLoginIdResponseDto(isAvailable);
  }

  @Get('/:phoneNumber/login-id')
  @ApiOperation({
    summary: 'PhoneNumber로 LoginId 리스트 조회 (ID 찾기) API',
  })
  @ApiNotFoundResponse({ description: '계정이 존재하지 않습니다.' })
  @ApiOkResponse({
    type: GetLoginIdListByPhoneNumberResponseDto,
  })
  async getLoginIdListByPhoneNumber(
    @Param() requestDto: GetLoginIdListByPhoneNumberRequestDto,
  ) {
    const { phoneNumber } = requestDto;

    const { loginIdList } =
      await this.userService.getLoginIdListByPhoneNumber(phoneNumber);

    return new GetLoginIdListByPhoneNumberResponseDto(loginIdList);
  }
}
