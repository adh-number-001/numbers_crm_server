import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GetTermsOfUseListResponseDto } from '../dto';
import { TermsOfUseService } from '../service/terms-of-use.service';

@ApiTags('TermsOfUse')
@Controller('terms-of-use')
export class TermsOfUseController {
  constructor(private readonly termsOfUseService: TermsOfUseService) {}

  @Get('/list')
  @ApiOperation({
    summary: '이용약관 리스트 조회 API',
  })
  @ApiOkResponse({
    type: GetTermsOfUseListResponseDto,
  })
  async getTermsOfUseListByOption() {
    const termsOfUseList = await this.termsOfUseService.getTermsOfUseList();

    return GetTermsOfUseListResponseDto.from(termsOfUseList);
  }
}
