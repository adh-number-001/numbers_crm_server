import { Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateContactGroupRequestDto,
  CreateContactGroupResponseDto,
  GetContactGroupListByUserIdRequestDto,
  GetContactGroupListByUserIdResponseDto,
} from '../dto';
import { ContactGroupService } from '../service/contact-group.service';

@ApiTags('ContactGroup')
@Controller('contact-group')
export class ContactGroupController {
  constructor(private readonly contactGroupService: ContactGroupService) {}

  // TODO: 유저 jwt 붙이기
  @Get('/list')
  @ApiOperation({
    summary: '그룹 리스트 조회 API',
  })
  @ApiOkResponse({
    type: GetContactGroupListByUserIdResponseDto,
  })
  async getContactGroupListByOption(
    @Query() requestDto: GetContactGroupListByUserIdRequestDto,
  ) {
    const { userId } = requestDto;
    const contactGroupList =
      await this.contactGroupService.getContactGroupListByUserId(userId);

    return GetContactGroupListByUserIdResponseDto.from(contactGroupList);
  }

  @Post('/')
  @ApiOperation({
    summary: '그룹 생성 API',
  })
  @ApiForbiddenResponse({ description: '이미 존재하는 그룹명입니다' })
  @ApiCreatedResponse({
    type: CreateContactGroupResponseDto,
  })
  async createContactGroup(@Query() requestDto: CreateContactGroupRequestDto) {
    const { userId, name, color } = requestDto;
    const { contactGroupId } =
      await this.contactGroupService.createContactGroup(userId, name, color);

    return new CreateContactGroupResponseDto(contactGroupId);
  }
}
