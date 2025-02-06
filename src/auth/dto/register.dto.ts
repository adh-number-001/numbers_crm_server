import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{11}$/)
  @IsString()
  readonly phoneNumber!: string;
}

export class RegisterResponseDto {
  @ApiProperty()
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
