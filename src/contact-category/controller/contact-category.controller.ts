import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
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
}
