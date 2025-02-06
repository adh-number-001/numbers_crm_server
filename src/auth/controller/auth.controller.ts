import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { RegisterRequestDto, RegisterResponseDto } from '../dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'email 회원가입 API',
  })
  @ApiForbiddenResponse({
    description: '이미 사용중인 email 또는 전화번호 입니다',
  })
  @ApiOkResponse({
    type: RegisterResponseDto,
  })
  async register(@Body() requestDto: RegisterRequestDto) {
    const { email, password, name, phoneNumber } = requestDto;
    const { userId } = await this.authService.register(
      email,
      password,
      name,
      phoneNumber,
    );

    return new RegisterResponseDto(userId);
  }
}
