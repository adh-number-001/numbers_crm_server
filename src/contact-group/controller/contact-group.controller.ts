import { Controller, Get, Post, Query } from '@nestjs/common';
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
  CreateContactGroupRequestDto,
  CreateContactGroupResponseDto,
  GetContactGroupListByUserIdResponseDto,
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

  @Post('/')
  @UserJwtAuth()
  @ApiOperation({
    summary: '그룹 생성 API',
  })
  @ApiForbiddenResponse({ description: '이미 존재하는 그룹명입니다' })
  @ApiCreatedResponse({
    type: CreateContactGroupResponseDto,
  })
  async createContactGroup(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
    @Query() requestDto: CreateContactGroupRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const { name, color } = requestDto;

    const { contactGroupId } =
      await this.contactGroupService.createContactGroup(userId, name, color);

    return new CreateContactGroupResponseDto(contactGroupId);
  }
}
