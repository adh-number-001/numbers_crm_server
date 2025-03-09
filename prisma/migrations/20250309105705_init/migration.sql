/*
  Warnings:

  - You are about to drop the column `name` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "ContactName" ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT true;
