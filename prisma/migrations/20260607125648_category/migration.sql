/*
  Warnings:

  - You are about to drop the column `source` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "source",
ADD COLUMN     "category" TEXT;
