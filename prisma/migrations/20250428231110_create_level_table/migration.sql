/*
    Creación de la tabla Level (Nivel del estudiante)
    Esta tabla se relaciona con Student
*/

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL PRIMARY KEY,
    "current" INTEGER NOT NULL,
    "currentExperience" INTEGER NOT NULL,
    "requiredExperience" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL
);

-- Crear índice para la relación con Student
CREATE INDEX "Level_studentId_idx" ON "Level"("studentId");

-- Agregar clave foránea
ALTER TABLE "Level" ADD CONSTRAINT "Level_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
