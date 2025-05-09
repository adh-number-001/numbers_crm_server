import { Jwt } from '@common/decorator';
import { JwtUserRequestDto } from '@common/dto';
import { UserJwtAuth } from '@common/util/guards';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateOrUpdateContactNoteResponseDto,
  CreateOrUpdateContactNoteBodyRequestDto,
  CreateOrUpdateContactNoteParamRequestDto,
} from '../dto';
import { ContactNoteService } from '../service/contact-note.service';

@ApiTags('ContactNote')
@Controller('contact-note')
export class ContactNoteController {
  constructor(private readonly contactNoteService: ContactNoteService) {}

  @Patch('/:contactId')
  @UserJwtAuth()
  @ApiOperation({
    summary: '연락처 메모 생성/수정 API',
  })
  @ApiNotFoundResponse({ description: '존재하지 않는 연락처입니다.' })
  @ApiForbiddenResponse({ description: '해당 계정의 연락처가 아닙니다.' })
  @ApiOkResponse({
    type: CreateOrUpdateContactNoteResponseDto,
  })
  async createOrUpdateContactNote(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
    @Param() paramRequestDto: CreateOrUpdateContactNoteParamRequestDto,
    @Body() bodyRequestDto: CreateOrUpdateContactNoteBodyRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const { contactId } = paramRequestDto;
    const { body } = bodyRequestDto;
    const contactNote = await this.contactNoteService.createOrUpdateContactNote(
      userId,
      contactId,
      body,
    );

    return CreateOrUpdateContactNoteResponseDto.from(contactNote);
  }
}
