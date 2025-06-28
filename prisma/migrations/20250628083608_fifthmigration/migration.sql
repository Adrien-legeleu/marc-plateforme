/*
  Warnings:

  - You are about to drop the column `firstname` on the `Entraineur` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Joueur` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Entraineur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Joueur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entraineur" DROP COLUMN "firstname",
ADD COLUMN     "firstName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Joueur" DROP COLUMN "firstname",
ADD COLUMN     "firstName" TEXT NOT NULL;
