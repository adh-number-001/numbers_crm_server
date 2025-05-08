-- DropForeignKey
ALTER TABLE "ContactGroupMapping" DROP CONSTRAINT "ContactGroupMapping_contactGroupId_fkey";

-- AddForeignKey
ALTER TABLE "ContactGroupMapping" ADD CONSTRAINT "ContactGroupMapping_contactGroupId_fkey" FOREIGN KEY ("contactGroupId") REFERENCES "ContactGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
