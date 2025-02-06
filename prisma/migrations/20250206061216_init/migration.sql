/*
  Warnings:

  - You are about to drop the column `accessTokenExpiresAt` on the `OAuth` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `OAuth` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpiresAt` on the `OAuth` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OAuth_refreshToken_key";

-- AlterTable
ALTER TABLE "OAuth" DROP COLUMN "accessTokenExpiresAt",
DROP COLUMN "refreshToken",
DROP COLUMN "refreshTokenExpiresAt";

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessTokenExpiresAt" INTEGER NOT NULL,
    "refreshTokenExpiresAt" INTEGER NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_userId_key" ON "UserToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_refreshToken_key" ON "UserToken"("refreshToken");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
