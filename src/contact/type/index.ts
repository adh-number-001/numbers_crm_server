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
