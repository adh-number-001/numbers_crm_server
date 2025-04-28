import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '../dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: '회원가입 API',
  })
  @ApiForbiddenResponse({
    description: '이미 가입된 id 입니다',
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
  })
  async register(@Body() requestDto: RegisterRequestDto) {
    const { loginId, password, fullName, birthDate, gender, deviceInfo } =
      requestDto;
    const userInfo = await this.authService.register(
      loginId,
      password,
      fullName,
      deviceInfo,
      birthDate,
      gender,
    );

    return new RegisterResponseDto(userInfo.userId);
  }

  @Post('/login')
  @ApiOperation({
    summary: '로그인 API',
  })
  @ApiForbiddenResponse({
    description: '유효하지 않은 계정 정보입니다',
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
  })
  async login(@Body() requestDto: LoginRequestDto) {
    const { username, password } = requestDto;
    const { userId } = await this.authService.login(username, password);

    return new LoginResponseDto(userId);
  }
}
