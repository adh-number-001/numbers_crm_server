import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, ArrayNotEmpty, Min } from 'class-validator';

export class CreateUserTermsOfUseRequestDto {
  @ApiProperty({ isArray: true, type: Number })
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  readonly termsOfUseIdList!: number[];
}

export class CreateUserTermsOfUseResponseDto {
  @ApiProperty()
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
