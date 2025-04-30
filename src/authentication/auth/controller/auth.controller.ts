import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
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
    type: LoginResponseDto,
  })
  async login(@Body() requestDto: LoginRequestDto) {
    const { loginId, password, deviceId, phoneNumber } = requestDto;
    const { accessToken, refreshToken } = await this.authService.login(
      loginId,
      password,
      deviceId,
      phoneNumber,
    );

    return new LoginResponseDto(accessToken, refreshToken);
  }

  @Post('/access-token')
  @ApiOperation({
    summary: 'Refresh Token으로 Access Token 재발급 API',
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않는 refresh token 입니다.',
  })
  @ApiInternalServerErrorResponse({ description: 'jwt decode 실패' })
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  async refreshAccessToken(@Body() requestDto: RefreshAccessTokenRequestDto) {
    const { refreshToken } = requestDto;
    const { accessToken } =
      await this.authService.refreshAccessToken(refreshToken);

    return new RefreshAccessTokenResponseDto(accessToken);
  }
}
