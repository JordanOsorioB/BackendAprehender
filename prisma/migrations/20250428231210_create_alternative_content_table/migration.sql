/*
    Creación de la tabla AlternativeContent (Contenido de tipo alternativas)
    Esta tabla se relaciona con ExerciseContent
*/

-- CreateTable
CREATE TABLE "AlternativeContent" (
    "id" SERIAL PRIMARY KEY,
    "statement" TEXT NOT NULL,
    "exerciseContentId" INTEGER NOT NULL
);

-- Crear índice para la relación con ExerciseContent
CREATE INDEX "AlternativeContent_exerciseContentId_idx" ON "AlternativeContent"("exerciseContentId");

-- Agregar clave foránea
ALTER TABLE "AlternativeContent" ADD CONSTRAINT "AlternativeContent_exerciseContentId_fkey" FOREIGN KEY ("exerciseContentId") REFERENCES "ExerciseContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
