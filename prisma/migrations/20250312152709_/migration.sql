/*
  Warnings:

  - You are about to drop the column `contactCategoryId` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "contactCategoryId";

-- CreateTable
CREATE TABLE "TempContact" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "uuid" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT true,
    "mainContactId" INTEGER,
    "tempMainContactId" INTEGER,

    CONSTRAINT "TempContact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TempContact" ADD CONSTRAINT "TempContact_tempMainContactId_fkey" FOREIGN KEY ("tempMainContactId") REFERENCES "TempContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
