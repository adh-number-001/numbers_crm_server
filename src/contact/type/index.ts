import {
  Contact,
  ContactAddress,
  ContactCarNumber,
  ContactEvent,
  ContactGroup,
  ContactGroupMapping,
  ContactNote,
  ContactVehicle,
  SubContact,
} from '@prisma/client';

export type ContactListByOption = {
  contactName: string;
  contactId: number;
  contactCategoryNameList: { contactCategoryName: string }[];
};

type UpdateSubPhoneNumber = {
  phoneNumber: string;
};

export type UpdateContact = {
  name: string;
  note: string;
  mainPhoneNumber: string;
  subPhoneNumberList: UpdateSubPhoneNumber[];
};

export type TempContactData = {
  uuid: string;
  userId: number;
  contactCategoryId: number | null;
  name: string | null;
  note: string | null;
  phoneNumber: string;
  isMain: boolean;
  mainContactId: number | null;
  tempMainContactId: number | null;
};

export type ContactDetail = Contact & {
  subContact: SubContact[];
  contactGroupMapping: (ContactGroupMapping & { contactGroup: ContactGroup })[];
  contactAddress: ContactAddress[];
  contactVehicle: ContactVehicle[];
  contactCarNumber: ContactCarNumber[];
  contactNote: ContactNote | null;
  contactEvent: ContactEvent[];
};
