import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import { AuthEnum } from '@common/util/enum/auth-enum';

export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{11}$/)
  @IsString()
  readonly phoneNumber!: string;

  @ApiProperty({ type: BigInt, required: false })
  @IsOptional()
  @Type(() => BigInt)
  readonly birthDate?: bigint;

  @ApiProperty({ enum: AuthEnum.GenderType, required: false })
  @IsOptional()
  @IsEnum(AuthEnum.GenderType)
  readonly gender?: AuthEnum.GenderType;
}

export class RegisterResponseDto {
  @ApiProperty()
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
