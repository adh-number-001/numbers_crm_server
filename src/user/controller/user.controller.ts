import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  GetLoginIdListByPhoneNumberRequestDto,
  GetLoginIdListByPhoneNumberResponseDto,
  UpdateUserPasswordRequestDto,
  UpdateUserPasswordResponseDto,
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
  @ApiNotFoundResponse({ description: '유저 정보를 찾을 수 없습니다.' })
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

  @Patch('/password')
  @ApiOperation({
    summary: 'Password 변경 API',
  })
  @ApiNotFoundResponse({ description: '유저 정보를 찾을 수 없습니다.' })
  @ApiOkResponse({
    type: UpdateUserPasswordResponseDto,
  })
  async updateUserPassword(@Body() requestDto: UpdateUserPasswordRequestDto) {
    const { loginId, password } = requestDto;

    const user = await this.userService.updateUserPassword(loginId, password);

    return new UpdateUserPasswordResponseDto(user.id);
  }
}
