import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetLoginIdListByPhoneNumberRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{11}$/)
  @IsString()
  readonly phoneNumber!: string;
}

export class GetLoginIdListByPhoneNumberResponseDto {
  @ApiProperty()
  readonly loginIdList: string[];

  constructor(loginIdList: string[]) {
    this.loginIdList = loginIdList;
  }
}
