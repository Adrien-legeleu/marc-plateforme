/*
  Warnings:

  - You are about to drop the column `age` on the `Joueur` table. All the data in the column will be lost.
  - You are about to drop the `Club` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bornDate` to the `Joueur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entraineur" ADD COLUMN     "cvUrls" TEXT[],
ADD COLUMN     "diplomas" TEXT[],
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "pastClubs" TEXT[],
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "projectType" TEXT,
ADD COLUMN     "socialLinks" TEXT[],
ADD COLUMN     "targetAudience" TEXT[],
ALTER COLUMN "telephone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Joueur" DROP COLUMN "age",
ADD COLUMN     "bornDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentLevel" TEXT,
ADD COLUMN     "educationLevel" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "lastClub" TEXT,
ADD COLUMN     "mobility" TEXT,
ADD COLUMN     "nationalities" TEXT[],
ADD COLUMN     "photoUrls" TEXT[],
ADD COLUMN     "position" TEXT[],
ADD COLUMN     "strongFoot" TEXT,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "videoUrls" TEXT[],
ADD COLUMN     "weight" INTEGER;

-- DropTable
DROP TABLE "Club";
