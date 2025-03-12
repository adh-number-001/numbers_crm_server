import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CheckAndStoreNewContactListRequestDto,
  CheckAndStoreNewContactListResponseDto,
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

  @Post('/list/temp')
  @ApiOperation({
    summary:
      '[동기화-1] 연락처 리스트 중 새로운 연락처 개수 확인 및 임시 저장 API',
    description: 'subPhoneNumber가 없을 경우 빈배열로 보내주세요',
  })
  @ApiOkResponse({
    type: CheckAndStoreNewContactListResponseDto,
  })
  async checkAndStoreNewContactList(
    @Body() requestDto: CheckAndStoreNewContactListRequestDto,
  ) {
    const { userId, contactCategoryId, contactList } = requestDto;
    const { count, uuid } =
      await this.contactService.checkAndStoreNewContactList(
        userId,
        contactCategoryId,
        contactList,
      );

    return CheckAndStoreNewContactListResponseDto.of(count, uuid);
  }
}
