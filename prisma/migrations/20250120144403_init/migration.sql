-- CreateTable
CREATE TABLE "TermsOfUse" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "isRequire" BOOLEAN NOT NULL,
    "date" INTEGER NOT NULL,

    CONSTRAINT "TermsOfUse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTermsOfUse" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "termsOfUseId" INTEGER NOT NULL,

    CONSTRAINT "UserTermsOfUse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessTokenExpiresAt" INTEGER NOT NULL,
    "refreshTokenExpiresAt" INTEGER NOT NULL,
    "scope" TEXT,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceToken" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ContactCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "contactCategoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactNote" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "contactId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "ContactNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLog" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactId" INTEGER,
    "callerNumber" TEXT NOT NULL,
    "receiverNumber" TEXT NOT NULL,
    "callType" TEXT NOT NULL,
    "startedAt" INTEGER NOT NULL,
    "endedAt" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLogNote" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "callLogId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "CallLogNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLogQuestion" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "body" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "CallLogQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCallLogAnswer" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "callLogQuestionId" INTEGER NOT NULL,
    "callLogId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "UserCallLogAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSetting" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "userId" INTEGER NOT NULL,
    "isCallEnabled" BOOLEAN NOT NULL,
    "isNoteEnabled" BOOLEAN NOT NULL,
    "isSyncEnabled" BOOLEAN NOT NULL,

    CONSTRAINT "NotificationSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_userId_key" ON "OAuth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_refreshToken_key" ON "OAuth"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Device_userId_key" ON "Device"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactNote_contactId_key" ON "ContactNote"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "CallLogNote_callLogId_key" ON "CallLogNote"("callLogId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSetting_userId_key" ON "NotificationSetting"("userId");

-- AddForeignKey
ALTER TABLE "UserTermsOfUse" ADD CONSTRAINT "UserTermsOfUse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTermsOfUse" ADD CONSTRAINT "UserTermsOfUse_termsOfUseId_fkey" FOREIGN KEY ("termsOfUseId") REFERENCES "TermsOfUse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactCategory" ADD CONSTRAINT "ContactCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contactCategoryId_fkey" FOREIGN KEY ("contactCategoryId") REFERENCES "ContactCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNote" ADD CONSTRAINT "ContactNote_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLogNote" ADD CONSTRAINT "CallLogNote_callLogId_fkey" FOREIGN KEY ("callLogId") REFERENCES "CallLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCallLogAnswer" ADD CONSTRAINT "UserCallLogAnswer_callLogId_fkey" FOREIGN KEY ("callLogId") REFERENCES "CallLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCallLogAnswer" ADD CONSTRAINT "UserCallLogAnswer_callLogQuestionId_fkey" FOREIGN KEY ("callLogQuestionId") REFERENCES "CallLogQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSetting" ADD CONSTRAINT "NotificationSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
