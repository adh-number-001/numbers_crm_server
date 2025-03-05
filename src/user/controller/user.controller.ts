import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CheckUsernameRequestDto, CheckUsernameResponseDto } from '../dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:username/check-username')
  @ApiOperation({
    summary: 'username(id) 사용 가능 여부 확인 API',
    description: 'true: 사용 가능, false: 사용 불가능',
  })
  @ApiOkResponse({
    type: CheckUsernameResponseDto,
  })
  async checkUsername(@Param() requestDto: CheckUsernameRequestDto) {
    const { username } = requestDto;
    const isAvailable = await this.userService.checkUsername(username);

    return new CheckUsernameResponseDto(isAvailable);
  }
}
