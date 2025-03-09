/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `ContactCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContactCategory_userId_name_key" ON "ContactCategory"("userId", "name");
