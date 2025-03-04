import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
    summary: 'id 회원가입 API',
  })
  @ApiForbiddenResponse({
    description: '이미 사용중인 id 또는 전화번호 입니다',
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
  })
  async register(@Body() requestDto: RegisterRequestDto) {
    const { username, password, fullName, phoneNumber, birthDate, gender } =
      requestDto;
    const { userId } = await this.authService.register(
      username,
      password,
      fullName,
      phoneNumber,
      birthDate,
      gender,
    );

    return new RegisterResponseDto(userId);
  }
}
