-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_contactCategoryId_fkey";

-- CreateTable
CREATE TABLE "ContactName" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "contactCategoryId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ContactName_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactName" ADD CONSTRAINT "ContactName_contactCategoryId_fkey" FOREIGN KEY ("contactCategoryId") REFERENCES "ContactCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactName" ADD CONSTRAINT "ContactName_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
