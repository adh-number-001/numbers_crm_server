import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

import { AuthEnum } from '@common/util/enum/auth-enum';
import { DeviceEnum } from '@common/util/enum/device-enum';

class RegisterDeviceRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly deviceId!: string;

  @ApiProperty({ type: DeviceEnum.OsType })
  @IsNotEmpty()
  @IsEnum(DeviceEnum.OsType)
  readonly osType!: DeviceEnum.OsType;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{11}$/)
  @IsString()
  readonly phoneNumber!: string;
}

export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly loginId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullName!: string;

  @ApiProperty({ type: BigInt, required: false })
  @IsNotEmpty()
  @Type(() => BigInt)
  readonly birthDate!: bigint;

  @ApiProperty({ enum: AuthEnum.GenderType, required: false })
  @IsNotEmpty()
  @IsEnum(AuthEnum.GenderType)
  readonly gender!: AuthEnum.GenderType;

  @ApiProperty({ type: RegisterDeviceRequestDto })
  @IsNotEmpty()
  @Type(() => RegisterDeviceRequestDto)
  @ValidateNested()
  readonly deviceInfo!: RegisterDeviceRequestDto;
}

export class RegisterResponseDto {
  @ApiProperty()
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
