import { Jwt } from '@common/decorator';
import { JwtUserRequestDto } from '@common/dto';
import { UserJwtAuth } from '@common/util/guards';
import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateContactEventResponseDto,
  CreateContactEventBodyRequestDto,
  CreateContactEventParamRequestDto,
} from '../dto';
import { ContactEventService } from '../service/contact-event.service';

@ApiTags('ContactEvent')
@Controller('contact-event')
export class ContactEventController {
  constructor(private readonly contactEventService: ContactEventService) {}

  @Post('/:contactId')
  @UserJwtAuth()
  @ApiOperation({
    summary: '활동일지 생성 API',
  })
  @ApiNotFoundResponse({ description: '존재하지 않는 연락처입니다.' })
  @ApiForbiddenResponse({ description: '해당 계정의 연락처가 아닙니다.' })
  @ApiOkResponse({
    type: CreateContactEventResponseDto,
  })
  async createContactEvent(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
    @Param() paramRequestDto: CreateContactEventParamRequestDto,
    @Body() bodyRequestDto: CreateContactEventBodyRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const { contactId } = paramRequestDto;
    const { eventDate, type, body } = bodyRequestDto;
    const contactEvent = await this.contactEventService.createContactEvent(
      userId,
      contactId,
      eventDate,
      type,
      body,
    );

    return CreateContactEventResponseDto.from(contactEvent);
  }
}
