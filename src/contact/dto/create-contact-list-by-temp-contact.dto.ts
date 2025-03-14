import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactListByTempContactRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly uuid!: string;
}

export class CreateContactListByTempContactResponseDto {
  @ApiProperty()
  readonly status: string;

  constructor() {
    this.status = 'OK';
  }

  static of() {
    return new CreateContactListByTempContactResponseDto();
  }
}
