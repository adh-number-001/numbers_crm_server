import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';
import { ContactCategory } from '@prisma/client';

export class GetContactCategoryListByUserIdRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId!: number;
}

export class GetContactCategoryListDetail {
  @ApiProperty()
  readonly contactCategoryId: number;

  @ApiProperty()
  readonly contactCategoryName: string;

  constructor(contactCategoryId: number, contactCategoryName: string) {
    this.contactCategoryId = contactCategoryId;
    this.contactCategoryName = contactCategoryName;
  }
}

export class GetContactCategoryListByUserIdResponseDto {
  @ApiProperty({ type: [GetContactCategoryListDetail] })
  readonly contactCategoryList: GetContactCategoryListDetail[];

  constructor(contactCategoryList: GetContactCategoryListDetail[]) {
    this.contactCategoryList = contactCategoryList;
  }

  static of(contactCategoryList: ContactCategory[]) {
    return new GetContactCategoryListByUserIdResponseDto(
      contactCategoryList.map((contactCategory) => {
        return new GetContactCategoryListDetail(
          contactCategory.id,
          contactCategory.name,
        );
      }),
    );
  }
}
