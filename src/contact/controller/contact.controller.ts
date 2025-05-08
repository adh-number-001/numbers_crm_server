import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Jwt } from '@common/decorator';
import { JwtUserRequestDto } from '@common/dto';
import { UserJwtAuth } from '@common/util/guards';

import {
  CreateContactRequestDto,
  CreateContactResponseDto, //   CheckAndStoreNewContactListRequestDto,
  //   CheckAndStoreNewContactListResponseDto,
  //   CreateContactListByTempContactRequestDto,
  //   CreateContactListByTempContactResponseDto,
  //   GetContactListByOptionRequestDto,
  //   GetContactListByOptionResponseDto,
} from '../dto';
import { ContactService } from '../service/contact.service';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  @UserJwtAuth()
  @ApiOperation({
    summary: '연락처 생성 API',
    description: '값 없을 땐 빈배열로 넘겨주세요.',
  })
  @ApiOkResponse({
    type: CreateContactResponseDto,
  })
  async createContact(
    @Jwt() jwtUserRequestDto: JwtUserRequestDto,
    @Body() requestDto: CreateContactRequestDto,
  ) {
    const { userId } = jwtUserRequestDto;
    const {
      name,
      phoneNumber,
      subContactList,
      contactGroupIdList,
      addressList,
      vehicleList,
      carNumberList,
    } = requestDto;

    await this.contactService.createContact(
      userId,
      name,
      phoneNumber,
      subContactList,
      contactGroupIdList,
      addressList,
      vehicleList,
      carNumberList,
    );

    return new CreateContactResponseDto();
  }

  //   // TODO: 유저 jwt 붙이기
  //   @Get('/list')
  //   @ApiOperation({
  //     summary: '옵션별 연락처 조회 API',
  //   })
  //   @ApiOkResponse({
  //     type: GetContactListByOptionResponseDto,
  //   })
  //   async getContactListByOption(
  //     @Query() requestDto: GetContactListByOptionRequestDto,
  //   ) {
  //     const { page, pageSize, userId, contactCategoryId, searchText } =
  //       requestDto;
  //     const { contactList, totalCount } =
  //       await this.contactService.getContactListByOption(
  //         page,
  //         pageSize,
  //         userId,
  //         contactCategoryId,
  //         searchText,
  //       );

  //     return GetContactListByOptionResponseDto.of(contactList, totalCount);
  //   }

  //   @Post('/list/temp')
  //   @ApiOperation({
  //     summary:
  //       '[동기화-1] 연락처 리스트 중 새로운 연락처 개수 확인 및 임시 저장 API',
  //     description: 'subPhoneNumber가 없을 경우 빈배열로 보내주세요',
  //   })
  //   @ApiOkResponse({
  //     type: CheckAndStoreNewContactListResponseDto,
  //   })
  //   async checkAndStoreNewContactList(
  //     @Body() requestDto: CheckAndStoreNewContactListRequestDto,
  //   ) {
  //     const { userId, contactCategoryId, contactList } = requestDto;
  //     const { count, uuid } =
  //       await this.contactService.checkAndStoreNewContactList(
  //         userId,
  //         contactCategoryId,
  //         contactList,
  //       );

  //     return CheckAndStoreNewContactListResponseDto.of(count, uuid);
  //   }

  //   @Post('/list/contact')
  //   @ApiOperation({
  //     summary: '[동기화-2] 임시 저장된 연락처 리스트 업로드 API',
  //   })
  //   @ApiOkResponse({
  //     type: CreateContactListByTempContactResponseDto,
  //   })
  //   async createContactListByTempContact(
  //     @Body() requestDto: CreateContactListByTempContactRequestDto,
  //   ) {
  //     const { userId, uuid } = requestDto;

  //     await this.contactService.createContactListByTempContact(userId, uuid);

  //     return new CreateContactListByTempContactResponseDto();
  //   }
}
