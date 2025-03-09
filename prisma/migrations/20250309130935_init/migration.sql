/*
  Warnings:

  - You are about to drop the column `contactCategoryId` on the `ContactName` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactName" DROP CONSTRAINT "ContactName_contactCategoryId_fkey";

-- AlterTable
ALTER TABLE "ContactName" DROP COLUMN "contactCategoryId";

-- CreateTable
CREATE TABLE "ContactNameCategoryMapping" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "contactNameId" INTEGER NOT NULL,
    "contactCategoryId" INTEGER NOT NULL,

    CONSTRAINT "ContactNameCategoryMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactNameCategoryMapping_contactNameId_contactCategoryId_key" ON "ContactNameCategoryMapping"("contactNameId", "contactCategoryId");

-- AddForeignKey
ALTER TABLE "ContactNameCategoryMapping" ADD CONSTRAINT "ContactNameCategoryMapping_contactNameId_fkey" FOREIGN KEY ("contactNameId") REFERENCES "ContactName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNameCategoryMapping" ADD CONSTRAINT "ContactNameCategoryMapping_contactCategoryId_fkey" FOREIGN KEY ("contactCategoryId") REFERENCES "ContactCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
