import { ApiProperty } from '@nestjs/swagger';
import { ContactNote } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateOrUpdateContactNoteParamRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly contactId!: number;
}

export class CreateOrUpdateContactNoteBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly body!: string;
}

export class CreateOrUpdateContactNoteResponseDto {
  @ApiProperty()
  readonly contactNoteId: number;

  @ApiProperty()
  readonly body: string;

  constructor(contactNoteId: number, body: string) {
    this.contactNoteId = contactNoteId;
    this.body = body;
  }

  static from(contactNote: ContactNote) {
    return new CreateOrUpdateContactNoteResponseDto(
      contactNote.id,
      contactNote.body,
    );
  }
}
