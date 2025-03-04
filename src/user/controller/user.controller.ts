import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CheckUsernameRequestDto, CheckUsernameResponseDto } from '../dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:username/check-username')
  @ApiOperation({
    summary: 'username(id) 중복 확인 API',
  })
  @ApiForbiddenResponse({
    description: '이미 사용중인 username(id) 입니다',
  })
  @ApiOkResponse({
    type: CheckUsernameResponseDto,
  })
  async checkUsername(@Param() requestDto: CheckUsernameRequestDto) {
    const { username } = requestDto;
    await this.userService.checkUsername(username);

    return new CheckUsernameResponseDto();
  }
}
