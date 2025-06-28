/*
  Warnings:

  - Changed the type of `age` on the `Joueur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Joueur" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL;
