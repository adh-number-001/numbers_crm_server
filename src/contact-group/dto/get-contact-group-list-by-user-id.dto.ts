import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';
import { ContactGroup } from '@prisma/client';

export class GetContactGroupListByUserIdRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly userId!: number;
}

export class GetContactGroupListDetail {
  @ApiProperty()
  readonly contactGroupId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;

  constructor(contactGroupId: number, name: string, color: string) {
    this.contactGroupId = contactGroupId;
    this.name = name;
    this.color = color;
  }
}

export class GetContactGroupListByUserIdResponseDto {
  @ApiProperty({ type: [GetContactGroupListDetail] })
  readonly contactGroupList: GetContactGroupListDetail[];

  constructor(contactGroupList: GetContactGroupListDetail[]) {
    this.contactGroupList = contactGroupList;
  }

  static from(contactGroupList: ContactGroup[]) {
    return new GetContactGroupListByUserIdResponseDto(
      contactGroupList.map((contactGroup) => {
        return new GetContactGroupListDetail(
          contactGroup.id,
          contactGroup.name,
          contactGroup.color,
        );
      }),
    );
  }
}
