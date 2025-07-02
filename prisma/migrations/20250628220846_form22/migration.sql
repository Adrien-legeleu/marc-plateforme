/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Entraineur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entraineur" DROP COLUMN "photoUrl",
ADD COLUMN     "photoUrls" TEXT[];
