import { ContactEnum } from '@common/util/enum/contact-enum';
import { ApiProperty } from '@nestjs/swagger';
import { ContactEvent } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString, IsEnum } from 'class-validator';

export class CreateContactEventParamRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly contactId!: number;
}

export class CreateContactEventBodyRequestDto {
  @ApiProperty()
  @Type(() => BigInt)
  @IsNotEmpty()
  readonly eventDate!: bigint;

  @ApiProperty({ enum: ContactEnum.ContactEventType })
  @IsNotEmpty()
  @IsEnum(ContactEnum.ContactEventType)
  readonly type!: ContactEnum.ContactEventType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly body!: string;
}

export class CreateContactEventResponseDto {
  @ApiProperty()
  readonly contactEventId: number;

  @ApiProperty()
  readonly body: string;

  constructor(contactEventId: number, body: string) {
    this.contactEventId = contactEventId;
    this.body = body;
  }

  static from(contactEvent: ContactEvent) {
    return new CreateContactEventResponseDto(
      contactEvent.id,
      contactEvent.body,
    );
  }
}
