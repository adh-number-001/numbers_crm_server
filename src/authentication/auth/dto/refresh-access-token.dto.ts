import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAccessTokenRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly refreshToken!: string;
}

export class RefreshAccessTokenResponseDto {
  @ApiProperty()
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
