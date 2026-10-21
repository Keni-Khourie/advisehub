/*
  Warnings:

  - You are about to drop the column `degreeClassification` on the `Degree` table. All the data in the column will be lost.
  - Added the required column `degreeClassificationId` to the `Degree` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Degree" DROP COLUMN "degreeClassification",
ADD COLUMN     "degreeClassificationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DegreeClassification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DegreeClassification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DegreeClassification_name_key" ON "DegreeClassification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DegreeClassification_abbreviation_key" ON "DegreeClassification"("abbreviation");

-- AddForeignKey
ALTER TABLE "Degree" ADD CONSTRAINT "Degree_degreeClassificationId_fkey" FOREIGN KEY ("degreeClassificationId") REFERENCES "DegreeClassification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
