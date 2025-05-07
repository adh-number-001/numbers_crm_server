import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly loginId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password!: string;
}

export class UpdateUserPasswordResponseDto {
  @ApiProperty()
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
