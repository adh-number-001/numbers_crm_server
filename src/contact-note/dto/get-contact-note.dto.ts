import { ApiProperty } from '@nestjs/swagger';
import { ContactNote } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class GetContactNoteRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly contactId!: number;
}

export class GetContactNoteResponseDto {
  @ApiProperty({ type: Number, required: false })
  readonly contactNoteId: number | null;

  @ApiProperty()
  readonly body: string;

  constructor(contactNoteId: number | null, body: string) {
    this.contactNoteId = contactNoteId;
    this.body = body;
  }

  static from(contactNote: ContactNote | null) {
    return new GetContactNoteResponseDto(
      contactNote ? contactNote.id : null,
      contactNote ? contactNote.body : '',
    );
  }
}
