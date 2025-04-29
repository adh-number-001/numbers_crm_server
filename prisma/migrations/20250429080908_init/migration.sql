/*
  Warnings:

  - You are about to drop the column `callType` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `callerNumber` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `endedAt` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `receiverNumber` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `isShownInList` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `deviceName` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `deviceToken` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `deviceType` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `isCallEnabled` on the `NotificationSetting` table. All the data in the column will be lost.
  - You are about to drop the column `isNoteEnabled` on the `NotificationSetting` table. All the data in the column will be lost.
  - You are about to drop the column `isSyncEnabled` on the `NotificationSetting` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `NotificationSetting` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `TermsOfUse` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CallLogNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CallLogQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactMapping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactNameCategoryMapping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TempContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCallLogAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,deviceId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deviceId]` on the table `NotificationSetting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `callDate` to the `CallLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `CallLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `CallLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `CallLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `osType` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `NotificationSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `TermsOfUse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TermsOfUse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `TermsOfUse` table without a default value. This is not possible if the table is not empty.
  - Made the column `birthDate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CallLog" DROP CONSTRAINT "CallLog_contactId_fkey";

-- DropForeignKey
ALTER TABLE "CallLogNote" DROP CONSTRAINT "CallLogNote_callLogId_fkey";

-- DropForeignKey
ALTER TABLE "ContactCategory" DROP CONSTRAINT "ContactCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactMapping" DROP CONSTRAINT "ContactMapping_mainContactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactMapping" DROP CONSTRAINT "ContactMapping_subContactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactName" DROP CONSTRAINT "ContactName_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactNameCategoryMapping" DROP CONSTRAINT "ContactNameCategoryMapping_contactCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ContactNameCategoryMapping" DROP CONSTRAINT "ContactNameCategoryMapping_contactNameId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationSetting" DROP CONSTRAINT "NotificationSetting_userId_fkey";

-- DropForeignKey
ALTER TABLE "TempContact" DROP CONSTRAINT "TempContact_tempMainContactId_fkey";

-- DropForeignKey
ALTER TABLE "UserCallLogAnswer" DROP CONSTRAINT "UserCallLogAnswer_callLogId_fkey";

-- DropForeignKey
ALTER TABLE "UserCallLogAnswer" DROP CONSTRAINT "UserCallLogAnswer_callLogQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_userId_fkey";

-- DropIndex
DROP INDEX "Device_userId_key";

-- DropIndex
DROP INDEX "NotificationSetting_userId_key";

-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "CallLog" DROP COLUMN "callType",
DROP COLUMN "callerNumber",
DROP COLUMN "contactId",
DROP COLUMN "duration",
DROP COLUMN "endedAt",
DROP COLUMN "receiverNumber",
DROP COLUMN "startedAt",
ADD COLUMN     "callDate" INTEGER NOT NULL,
ADD COLUMN     "date" BIGINT NOT NULL,
ADD COLUMN     "modifiedAt" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "isShownInList",
ADD COLUMN     "modifiedAt" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'ㅇ',
ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ContactNote" ADD COLUMN     "modifiedAt" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceName",
DROP COLUMN "deviceToken",
DROP COLUMN "deviceType",
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "osType" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NotificationSetting" DROP COLUMN "isCallEnabled",
DROP COLUMN "isNoteEnabled",
DROP COLUMN "isSyncEnabled",
DROP COLUMN "userId",
ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD COLUMN     "isAppNotificationAlert" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isIncomingCallAlert" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isMarketingAlert" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isMissedCallAlert" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "modifiedAt" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TermsOfUse" DROP COLUMN "date",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumber",
DROP COLUMN "username",
ADD COLUMN     "loginId" TEXT NOT NULL DEFAULT 'ㅇ',
ADD COLUMN     "modifiedAt" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "birthDate" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;

-- DropTable
DROP TABLE "CallLogNote";

-- DropTable
DROP TABLE "CallLogQuestion";

-- DropTable
DROP TABLE "ContactCategory";

-- DropTable
DROP TABLE "ContactMapping";

-- DropTable
DROP TABLE "ContactName";

-- DropTable
DROP TABLE "ContactNameCategoryMapping";

-- DropTable
DROP TABLE "TempContact";

-- DropTable
DROP TABLE "UserCallLogAnswer";

-- DropTable
DROP TABLE "UserToken";

-- CreateTable
CREATE TABLE "ContactGroup" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ContactGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactGroupMapping" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "contactGroupId" INTEGER NOT NULL,

    CONSTRAINT "ContactGroupMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubContact" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "SubContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactAddress" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ContactAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactVehicle" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ContactVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactCarNumber" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ContactCarNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "eventDate" BIGINT NOT NULL,
    "type" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ContactEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContactLog" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "UserContactLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactGroup_userId_name_key" ON "ContactGroup"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ContactGroupMapping_contactId_contactGroupId_key" ON "ContactGroupMapping"("contactId", "contactGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactEvent_contactId_key" ON "ContactEvent"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_userId_deviceId_key" ON "Device"("userId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSetting_deviceId_key" ON "NotificationSetting"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginId_key" ON "User"("loginId");

-- AddForeignKey
ALTER TABLE "ContactGroup" ADD CONSTRAINT "ContactGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroupMapping" ADD CONSTRAINT "ContactGroupMapping_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroupMapping" ADD CONSTRAINT "ContactGroupMapping_contactGroupId_fkey" FOREIGN KEY ("contactGroupId") REFERENCES "ContactGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubContact" ADD CONSTRAINT "SubContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactAddress" ADD CONSTRAINT "ContactAddress_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactVehicle" ADD CONSTRAINT "ContactVehicle_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactCarNumber" ADD CONSTRAINT "ContactCarNumber_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEvent" ADD CONSTRAINT "ContactEvent_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSetting" ADD CONSTRAINT "NotificationSetting_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
