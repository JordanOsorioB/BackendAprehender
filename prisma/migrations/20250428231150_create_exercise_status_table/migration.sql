/*
    Creación de la tabla ExerciseStatus (Estado de cada ejercicio)
    Esta tabla se relaciona con Exercise
*/

-- CreateTable
CREATE TABLE "ExerciseStatus" (
    "id" SERIAL PRIMARY KEY,
    "completed" BOOLEAN NOT NULL,
    "attempts" INTEGER NOT NULL,
    "lastAttempt" TIMESTAMP(3),
    "correctAnswers" INTEGER NOT NULL,
    "gainedExperience" INTEGER NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "exerciseId" TEXT NOT NULL
);

-- Crear índice para la relación con Exercise
CREATE INDEX "ExerciseStatus_exerciseId_idx" ON "ExerciseStatus"("exerciseId");

-- Agregar clave foránea
ALTER TABLE "ExerciseStatus" ADD CONSTRAINT "ExerciseStatus_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
