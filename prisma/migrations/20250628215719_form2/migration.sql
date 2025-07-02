/*
  Warnings:

  - The `projectType` column on the `Entraineur` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Entraineur" DROP COLUMN "projectType",
ADD COLUMN     "projectType" TEXT[];
