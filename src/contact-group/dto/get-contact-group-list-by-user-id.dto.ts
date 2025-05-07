import { ApiProperty } from '@nestjs/swagger';

import { ContactGroupWithCount } from '../type';

export class GetContactGroupListDetail {
  @ApiProperty()
  readonly contactGroupId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;

  @ApiProperty()
  readonly contactCount: number;

  constructor(
    contactGroupId: number,
    name: string,
    color: string,
    contactCount: number,
  ) {
    this.contactGroupId = contactGroupId;
    this.name = name;
    this.color = color;
    this.contactCount = contactCount;
  }
}

export class GetContactGroupListByUserIdResponseDto {
  @ApiProperty({ type: [GetContactGroupListDetail] })
  readonly contactGroupList: GetContactGroupListDetail[];

  constructor(contactGroupList: GetContactGroupListDetail[]) {
    this.contactGroupList = contactGroupList;
  }

  static from(contactGroupList: ContactGroupWithCount[]) {
    return new GetContactGroupListByUserIdResponseDto(
      contactGroupList.map((contactGroup) => {
        return new GetContactGroupListDetail(
          contactGroup.id,
          contactGroup.name,
          contactGroup.color,
          contactGroup._count.contactGroupMapping,
        );
      }),
    );
  }
}
