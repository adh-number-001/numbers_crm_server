-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "isShownInList" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "ContactMapping" (
    "id" SERIAL NOT NULL,
    "createdAt" BIGINT NOT NULL DEFAULT 0,
    "mainContactId" INTEGER NOT NULL,
    "subContactId" INTEGER NOT NULL,

    CONSTRAINT "ContactMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactMapping_mainContactId_subContactId_key" ON "ContactMapping"("mainContactId", "subContactId");

-- AddForeignKey
ALTER TABLE "ContactMapping" ADD CONSTRAINT "ContactMapping_mainContactId_fkey" FOREIGN KEY ("mainContactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMapping" ADD CONSTRAINT "ContactMapping_subContactId_fkey" FOREIGN KEY ("subContactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
