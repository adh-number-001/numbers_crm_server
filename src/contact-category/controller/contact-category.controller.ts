import { Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateContactCategoryRequestDto,
  CreateContactCategoryResponseDto,
  GetContactCategoryListByUserIdRequestDto,
  GetContactCategoryListByUserIdResponseDto,
} from '../dto';
import { ContactCategoryService } from '../service/contact-category.service';

@ApiTags('ContactCategory')
@Controller('contact-category')
export class ContactCategoryController {
  constructor(
    private readonly contactCategoryService: ContactCategoryService,
  ) {}

  // TODO: 유저 jwt 붙이기
  @Get('/list')
  @ApiOperation({
    summary: '그룹 리스트 조회 API',
  })
  @ApiOkResponse({
    type: GetContactCategoryListByUserIdResponseDto,
  })
  async getContactCategoryListByOption(
    @Query() requestDto: GetContactCategoryListByUserIdRequestDto,
  ) {
    const { userId } = requestDto;
    const contactCategoryList =
      await this.contactCategoryService.getContactCategoryListByUserId(userId);

    return GetContactCategoryListByUserIdResponseDto.of(contactCategoryList);
  }

  @Post('/')
  @ApiOperation({
    summary: '그룹 생성 API',
  })
  @ApiForbiddenResponse({ description: '이미 존재하는 그룹명입니다' })
  @ApiCreatedResponse({
    type: CreateContactCategoryResponseDto,
  })
  async createContactCategory(
    @Query() requestDto: CreateContactCategoryRequestDto,
  ) {
    const { userId, contactCategoryName } = requestDto;
    const { contactCategoryId } =
      await this.contactCategoryService.createContactCategory(
        userId,
        contactCategoryName,
      );

    return new CreateContactCategoryResponseDto(contactCategoryId);
  }
}
