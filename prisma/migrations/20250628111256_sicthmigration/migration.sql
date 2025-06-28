/*
  Warnings:

  - You are about to drop the column `cvUrl` on the `Joueur` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Entraineur_email_key";

-- DropIndex
DROP INDEX "Entraineur_telephone_key";

-- DropIndex
DROP INDEX "Joueur_email_key";

-- AlterTable
ALTER TABLE "Joueur" DROP COLUMN "cvUrl",
ADD COLUMN     "cvUrls" TEXT[];
