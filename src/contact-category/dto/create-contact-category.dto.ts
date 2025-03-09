import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateContactCategoryRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly contactCategoryName!: string;
}

export class CreateContactCategoryResponseDto {
  @ApiProperty()
  readonly contactCategoryId: number;

  constructor(contactCategoryId: number) {
    this.contactCategoryId = contactCategoryId;
  }
}
