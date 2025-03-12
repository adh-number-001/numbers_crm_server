import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class UpdateSubPhoneNumberListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber!: string;
}

class UpdateContactListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly note!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly mainPhoneNumber!: string;

  @ApiProperty({ type: [UpdateSubPhoneNumberListDto] })
  @IsNotEmpty()
  @Type(() => UpdateSubPhoneNumberListDto)
  @IsArray()
  @ValidateNested({ each: true })
  readonly subPhoneNumberList!: UpdateSubPhoneNumberListDto[];
}

export class CheckAndStoreNewContactListRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly contactCategoryId!: number;

  @ApiProperty({ type: [UpdateContactListDto] })
  @IsNotEmpty()
  @Type(() => UpdateContactListDto)
  @IsArray()
  @ValidateNested({ each: true })
  readonly contactList!: UpdateContactListDto[];
}

export class CheckAndStoreNewContactListResponseDto {
  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly uuid: string;

  constructor(count: number, uuid: string) {
    this.count = count;
    this.uuid = uuid;
  }

  static of(count: number, uuid: string) {
    return new CheckAndStoreNewContactListResponseDto(count, uuid);
  }
}
