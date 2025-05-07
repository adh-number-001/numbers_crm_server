import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactGroupRequestDto {
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
