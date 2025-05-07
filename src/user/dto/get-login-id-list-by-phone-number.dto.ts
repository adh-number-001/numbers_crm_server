import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetLoginIdListByPhoneNumberRequestDto {
  @ApiProperty()
  @IsNotEmpty()
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
