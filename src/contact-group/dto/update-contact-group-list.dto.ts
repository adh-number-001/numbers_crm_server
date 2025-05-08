import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UpdateContactGroupListDto {
  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsInt()
  readonly contactGroupId?: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly color?: string;
}

export class UpdateContactGroupListRequestDto {
  @ApiProperty({ type: [UpdateContactGroupListDto] })
  @Type(() => UpdateContactGroupListDto)
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  readonly contactGroupList!: UpdateContactGroupListDto[];
}

export class UpdateContactGroupListResponseDto {
  @ApiProperty()
  readonly status: string;

  constructor() {
    this.status = 'Success!';
  }
}
