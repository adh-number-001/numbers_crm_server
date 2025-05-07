import { ContactGroup } from '@prisma/client';

export type ContactGroupWithCount = ContactGroup & {
  _count: { contactGroupMapping: number };
};
