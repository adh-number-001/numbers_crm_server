import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  GetContactListByOptionRequestDto,
  GetContactListByOptionResponseDto,
} from '../dto';
import { ContactService } from '../service/contact.service';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // TODO: 유저 jwt 붙이기
  @Get('/list')
  @ApiOperation({
    summary: '옵션별 연락처 조회 API',
  })
  @ApiOkResponse({
    type: GetContactListByOptionResponseDto,
  })
  async getContactListByOption(
    @Query() requestDto: GetContactListByOptionRequestDto,
  ) {
    const { page, pageSize, userId, contactCategoryId, searchText } =
      requestDto;
    const { contactList, totalCount } =
      await this.contactService.getContactListByOption(
        page,
        pageSize,
        userId,
        contactCategoryId,
        searchText,
      );

    return GetContactListByOptionResponseDto.of(contactList, totalCount);
  }
}
