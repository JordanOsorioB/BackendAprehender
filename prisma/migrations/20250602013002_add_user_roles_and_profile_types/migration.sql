/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('UTP', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('UTP', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "profileType" "ProfileType" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "profileType" "ProfileType" NOT NULL DEFAULT 'TEACHER',
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT';

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
