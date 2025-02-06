/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CallLog" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "CallLogNote" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "CallLogQuestion" ALTER COLUMN "createdAt" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ContactCategory" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ContactName" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ContactNote" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "createdAt" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "NotificationSetting" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OAuth" ALTER COLUMN "createdAt" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "TermsOfUse" ALTER COLUMN "createdAt" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false,
ALTER COLUMN "date" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false,
ALTER COLUMN "isBlocked" SET DEFAULT false,
ALTER COLUMN "isAdmin" SET DEFAULT false;

-- AlterTable
ALTER TABLE "UserCallLogAnswer" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UserTermsOfUse" ALTER COLUMN "createdAt" SET DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "UserToken" ALTER COLUMN "createdAt" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
