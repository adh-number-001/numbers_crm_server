import { ApiProperty } from '@nestjs/swagger';
import { TermsOfUse } from '@prisma/client';

export class GetTermsOfUseListDetail {
  @ApiProperty()
  readonly termsOfUseId: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly body: string;

  @ApiProperty()
  readonly isRequire: boolean;

  constructor(
    termsOfUseId: number,
    title: string,
    body: string,
    isRequire: boolean,
  ) {
    this.termsOfUseId = termsOfUseId;
    this.title = title;
    this.body = body;
    this.isRequire = isRequire;
  }
}

export class GetTermsOfUseListResponseDto {
  @ApiProperty({ type: [GetTermsOfUseListDetail] })
  readonly termsOfUseList: GetTermsOfUseListDetail[];

  constructor(termsOfUseList: GetTermsOfUseListDetail[]) {
    this.termsOfUseList = termsOfUseList;
  }

  static from(termsOfUseList: TermsOfUse[]) {
    return new GetTermsOfUseListResponseDto(
      termsOfUseList.map((termsOfUse) => {
        return new GetTermsOfUseListDetail(
          termsOfUse.id,
          termsOfUse.title,
          termsOfUse.body,
          termsOfUse.isRequire,
        );
      }),
    );
  }
}
