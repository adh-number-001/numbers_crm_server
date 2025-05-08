import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UserJwtAuth } from '@common/util/guards';
import { JwtUserRequestDto } from '@common/dto';
import { Jwt } from '@common/decorator';

import {
  GetContactGroupListByUserIdResponseDto,
  UpdateContactGroupListRequestDto,
  UpdateContactGroupListResponseDto,
} from '../dto';
import { ContactGroupService } from '../service/contact-group.service';

@ApiTags('ContactGroup')
@Controller('contact-group')
export class ContactGroupController {
  constructor(private readonly contactGroupService: ContactGroupService) {}

  @Get('/list')
  @UserJwtAuth()
  @ApiOperation({
    summary: '유저별 그룹 리스트 조회 API',
  })
  @ApiOkResponse({
    type: GetContactGroupListByUserIdResponseDto,
  })
  async getContactGroupListByOption(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const contactGroupList =
      await this.contactGroupService.getContactGroupListByUserId(userId);

    return GetContactGroupListByUserIdResponseDto.from(contactGroupList);
  }

  @Patch('/')
  @UserJwtAuth()
  @ApiOperation({
    summary: '그룹 관리 (생성, 수정, 삭제) API',
    description:
      '생성: name + color / 수정: contactGroupId + name + color / 삭제: contactGroupId',
  })
  @ApiForbiddenResponse({ description: '이미 존재하는 그룹명입니다' })
  @ApiCreatedResponse({
    type: UpdateContactGroupListResponseDto,
  })
  async updateContactGroupList(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
    @Body() requestDto: UpdateContactGroupListRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const { contactGroupList } = requestDto;

    await this.contactGroupService.updateContactGroupList(
      userId,
      contactGroupList,
    );

    return new UpdateContactGroupListResponseDto();
  }
}
