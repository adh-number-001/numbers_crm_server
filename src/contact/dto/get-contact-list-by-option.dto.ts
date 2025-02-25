import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ContactListByOption } from '../type';

export class GetContactListByOptionRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly page!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly pageSize!: number;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly contactCategoryId?: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly searchText?: string;
}

export class GetContactCategoryListDetail {
  @ApiProperty()
  readonly contactCategoryName: string;

  constructor(contactCategoryName: string) {
    this.contactCategoryName = contactCategoryName;
  }
}

export class GetContactListDetail {
  @ApiProperty()
  readonly contactName: string;

  @ApiProperty()
  readonly contactId: number;

  @ApiProperty()
  readonly contactCategoryList: GetContactCategoryListDetail[];

  constructor(
    contactName: string,
    contactId: number,
    contactCategoryList: GetContactCategoryListDetail[],
  ) {
    this.contactName = contactName;
    this.contactId = contactId;
    this.contactCategoryList = contactCategoryList;
  }
}

export class GetContactListByOptionResponseDto {
  @ApiProperty({ type: [GetContactListDetail] })
  readonly contactList: GetContactListDetail[];

  @ApiProperty()
  readonly totalCount: number;

  constructor(contactList: GetContactListDetail[], totalCount: number) {
    this.contactList = contactList;
    this.totalCount = totalCount;
  }

  static of(contactList: ContactListByOption[], totalCount: number) {
    return new GetContactListByOptionResponseDto(
      contactList.map((contact) => {
        return new GetContactListDetail(
          contact.contactName,
          contact.contactId,
          contact.contactCategoryNameList,
        );
      }),
      totalCount,
    );
  }
}
