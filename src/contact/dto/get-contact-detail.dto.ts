import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ContactDetail } from '../type';

export class GetContactDetailRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly contactId!: number;
}

class SubContactListDetail {
  @ApiProperty()
  readonly subContactId: number;

  @ApiProperty()
  readonly phoneNumber: string;

  constructor(subContactId: number, phoneNumber: string) {
    this.subContactId = subContactId;
    this.phoneNumber = phoneNumber;
  }
}

class ContactGroupListDetail {
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

class ContactAddressListDetail {
  @ApiProperty()
  readonly contactAddressId: number;

  @ApiProperty()
  readonly body: string;

  constructor(contactAddressId: number, body: string) {
    this.contactAddressId = contactAddressId;
    this.body = body;
  }
}

class ContactVehicleListDetail {
  @ApiProperty()
  readonly contactVehicleId: number;

  @ApiProperty()
  readonly body: string;

  constructor(contactVehicleId: number, body: string) {
    this.contactVehicleId = contactVehicleId;
    this.body = body;
  }
}

class ContactCarNumberListDetail {
  @ApiProperty()
  readonly contactCarNumberId: number;

  @ApiProperty()
  readonly body: string;

  constructor(contactCarNumberId: number, body: string) {
    this.contactCarNumberId = contactCarNumberId;
    this.body = body;
  }
}

export class GetContactDetailResponseDto {
  @ApiProperty()
  readonly contactId: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty({ type: [SubContactListDetail] })
  readonly subContactList: SubContactListDetail[];

  @ApiProperty({ type: [ContactGroupListDetail] })
  readonly contactGroupList: ContactGroupListDetail[];

  @ApiProperty({ type: [ContactAddressListDetail] })
  readonly addressList: ContactAddressListDetail[];

  @ApiProperty({ type: [ContactVehicleListDetail] })
  readonly vehicleList: ContactVehicleListDetail[];

  @ApiProperty({ type: [ContactCarNumberListDetail] })
  readonly carNumberList: ContactCarNumberListDetail[];

  constructor(
    contactId: number,
    name: string,
    phoneNumber: string,
    subContactList: SubContactListDetail[],
    contactGroupList: ContactGroupListDetail[],
    addressList: ContactAddressListDetail[],
    vehicleList: ContactVehicleListDetail[],
    carNumberList: ContactCarNumberListDetail[],
  ) {
    this.contactId = contactId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.subContactList = subContactList;
    this.contactGroupList = contactGroupList;
    this.addressList = addressList;
    this.vehicleList = vehicleList;
    this.carNumberList = carNumberList;
  }

  static from(contactDetail: ContactDetail) {
    return new GetContactDetailResponseDto(
      contactDetail.id,
      contactDetail.name,
      contactDetail.phoneNumber,
      contactDetail.subContact.map((subContact) => ({
        subContactId: subContact.id,
        phoneNumber: subContact.phoneNumber,
      })),
      contactDetail.contactGroupMapping.map((contactGroupMapping) => ({
        contactGroupId: contactGroupMapping.contactGroupId,
        name: contactGroupMapping.contactGroup.name,
        color: contactGroupMapping.contactGroup.color,
      })),
      contactDetail.contactAddress.map((address) => ({
        contactAddressId: address.id,
        body: address.body,
      })),
      contactDetail.contactVehicle.map((vehicle) => ({
        contactVehicleId: vehicle.id,
        body: vehicle.body,
      })),
      contactDetail.contactCarNumber.map((carNumber) => ({
        contactCarNumberId: carNumber.id,
        body: carNumber.body,
      })),
    );
  }
}
