/*
  Warnings:

  - You are about to drop the column `subject` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SchoolYear" AS ENUM ('PRIMERO_BASICO', 'SEGUNDO_BASICO', 'TERCERO_BASICO', 'CUARTO_BASICO', 'QUINTO_BASICO', 'SEXTO_BASICO', 'SEPTIMO_BASICO', 'OCTAVO_BASICO', 'PRIMERO_MEDIO', 'SEGUNDO_MEDIO', 'TERCERO_MEDIO', 'CUARTO_MEDIO');

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subject",
ADD COLUMN     "subjectId" TEXT NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" "SchoolYear" NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE INDEX "Teacher_subjectId_idx" ON "Teacher"("subjectId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
