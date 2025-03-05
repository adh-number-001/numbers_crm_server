import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckUsernameRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username!: string;
}

export class CheckUsernameResponseDto {
  @ApiProperty()
  readonly isAvailable: boolean;

  constructor(isAvailable: boolean) {
    this.isAvailable = isAvailable;
  }
}
