-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('alternativas', 'desarrollo', 'terminos_pareados');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "schoolId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectUnit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "subjectId" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "SubjectUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "difficulty" TEXT NOT NULL,
    "totalExperience" INTEGER NOT NULL,
    "subjectUnitId" INTEGER NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseState" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "attempts" INTEGER NOT NULL,
    "lastAttempt" TIMESTAMP(3) NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "experienceEarned" INTEGER NOT NULL,
    "locked" BOOLEAN NOT NULL,

    CONSTRAINT "ExerciseState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSubjectProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "StudentSubjectProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentUnitProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,
    "unitFkId" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "StudentUnitProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PairingPair" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "PairingPair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PairingContent" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "pairingPairId" INTEGER NOT NULL,

    CONSTRAINT "PairingContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevelopmentContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "DevelopmentContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseContent" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "ExerciseContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlternativeOption" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "exerciseContentId" INTEGER NOT NULL,

    CONSTRAINT "AlternativeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlternativeContent" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "alternativeOptionId" INTEGER NOT NULL,

    CONSTRAINT "AlternativeContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectUnit" ADD CONSTRAINT "SubjectUnit_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectUnit" ADD CONSTRAINT "SubjectUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_subjectUnitId_fkey" FOREIGN KEY ("subjectUnitId") REFERENCES "SubjectUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseState" ADD CONSTRAINT "ExerciseState_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseState" ADD CONSTRAINT "ExerciseState_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjectProgress" ADD CONSTRAINT "StudentSubjectProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjectProgress" ADD CONSTRAINT "StudentSubjectProgress_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentUnitProgress" ADD CONSTRAINT "StudentUnitProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentUnitProgress" ADD CONSTRAINT "StudentUnitProgress_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "SubjectUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentUnitProgress" ADD CONSTRAINT "StudentUnitProgress_unitFkId_fkey" FOREIGN KEY ("unitFkId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairingPair" ADD CONSTRAINT "PairingPair_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairingContent" ADD CONSTRAINT "PairingContent_pairingPairId_fkey" FOREIGN KEY ("pairingPairId") REFERENCES "PairingPair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevelopmentContent" ADD CONSTRAINT "DevelopmentContent_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseContent" ADD CONSTRAINT "ExerciseContent_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlternativeOption" ADD CONSTRAINT "AlternativeOption_exerciseContentId_fkey" FOREIGN KEY ("exerciseContentId") REFERENCES "ExerciseContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlternativeContent" ADD CONSTRAINT "AlternativeContent_alternativeOptionId_fkey" FOREIGN KEY ("alternativeOptionId") REFERENCES "AlternativeOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
