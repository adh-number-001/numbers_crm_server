-- CreateTable
CREATE TABLE "TermsOfUse" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isRequire" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "TermsOfUse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTermsOfUse" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "termsOfUseId" INTEGER NOT NULL,

    CONSTRAINT "UserTermsOfUse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "loginId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthDate" BIGINT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "scope" TEXT,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDevice" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "deviceId" TEXT NOT NULL,
    "osType" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "UserDevice_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "ContactNote" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "contactId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ContactNote_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "CallLog" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" BIGINT NOT NULL,
    "callDate" INTEGER NOT NULL,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSetting" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "modifiedAt" BIGINT NOT NULL DEFAULT 0,
    "userDeviceId" INTEGER NOT NULL,
    "isAppNotificationAlert" BOOLEAN NOT NULL DEFAULT true,
    "isMissedCallAlert" BOOLEAN NOT NULL DEFAULT true,
    "isIncomingCallAlert" BOOLEAN NOT NULL DEFAULT true,
    "isMarketingAlert" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NotificationSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContactLog" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "userDeviceId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "UserContactLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_loginId_key" ON "User"("loginId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_userId_key" ON "OAuth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDevice_userId_deviceId_key" ON "UserDevice"("userId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactGroup_userId_name_key" ON "ContactGroup"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ContactGroupMapping_contactId_contactGroupId_key" ON "ContactGroupMapping"("contactId", "contactGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactNote_contactId_key" ON "ContactNote"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactEvent_contactId_key" ON "ContactEvent"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSetting_userDeviceId_key" ON "NotificationSetting"("userDeviceId");

-- AddForeignKey
ALTER TABLE "UserTermsOfUse" ADD CONSTRAINT "UserTermsOfUse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTermsOfUse" ADD CONSTRAINT "UserTermsOfUse_termsOfUseId_fkey" FOREIGN KEY ("termsOfUseId") REFERENCES "TermsOfUse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDevice" ADD CONSTRAINT "UserDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroup" ADD CONSTRAINT "ContactGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroupMapping" ADD CONSTRAINT "ContactGroupMapping_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroupMapping" ADD CONSTRAINT "ContactGroupMapping_contactGroupId_fkey" FOREIGN KEY ("contactGroupId") REFERENCES "ContactGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "ContactNote" ADD CONSTRAINT "ContactNote_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEvent" ADD CONSTRAINT "ContactEvent_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSetting" ADD CONSTRAINT "NotificationSetting_userDeviceId_fkey" FOREIGN KEY ("userDeviceId") REFERENCES "UserDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
