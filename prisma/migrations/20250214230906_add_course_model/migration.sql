/*
  Warnings:

  - You are about to drop the column `studentId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the `StudentProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "studentId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentProfile";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_teacherId_idx" ON "Course"("teacherId");

-- CreateIndex
CREATE INDEX "Progress_courseId_idx" ON "Progress"("courseId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
