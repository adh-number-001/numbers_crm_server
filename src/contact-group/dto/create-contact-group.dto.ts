import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateContactGroupRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly color!: string;
}

export class CreateContactGroupResponseDto {
  @ApiProperty()
  readonly contactGroupId: number;

  constructor(contactGroupId: number) {
    this.contactGroupId = contactGroupId;
  }
}
