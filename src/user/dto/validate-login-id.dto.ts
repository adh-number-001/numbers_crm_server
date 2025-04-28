import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateLoginIdRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly loginId!: string;
}

export class ValidateLoginIdResponseDto {
  @ApiProperty()
  readonly isAvailable: boolean;

  constructor(isAvailable: boolean) {
    this.isAvailable = isAvailable;
  }
}
