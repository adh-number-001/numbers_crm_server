import { ContactGroup } from '@prisma/client';

export type ContactGroupWithCount = ContactGroup & {
  _count: { contactGroupMapping: number };
};

export type UpdateContactGroup = {
  contactGroupId?: number;
  name?: string;
  color?: string;
};
