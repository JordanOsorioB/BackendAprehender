/*
    Creación de la tabla ExerciseContent (Contenido de cada ejercicio)
    Esta tabla se relaciona con Exercise
*/

-- CreateTable
CREATE TABLE "ExerciseContent" (
    "id" SERIAL PRIMARY KEY,
    "exerciseId" TEXT NOT NULL
);

-- Crear índice para la relación con Exercise
CREATE INDEX "ExerciseContent_exerciseId_idx" ON "ExerciseContent"("exerciseId");

-- Agregar clave foránea
ALTER TABLE "ExerciseContent" ADD CONSTRAINT "ExerciseContent_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
