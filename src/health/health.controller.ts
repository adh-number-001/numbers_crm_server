import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import ApiDocsGenerator from '@common/decorator/api-docs.generator';

@Controller()
@ApiTags('Health')
export class HealthController {
  @Get('/health')
  @ApiDocsGenerator({
    apiDescription: '헬스 체크 API',
    statusArgs: [{ status: 200, description: '헬스체크 성공' }],
  })
  getHello(): string {
    return 'health';
  }
}
