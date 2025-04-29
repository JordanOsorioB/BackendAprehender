/*
    Creación de la tabla DevelopmentContent (Contenido de desarrollo)
    Esta tabla se relaciona con ExerciseContent
*/

-- CreateTable
CREATE TABLE "DevelopmentContent" (
    "id" SERIAL PRIMARY KEY,
    "statement" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "keywords" TEXT[], -- Arreglo de palabras clave
    "matchPercentage" INTEGER NOT NULL,
    "exerciseContentId" INTEGER NOT NULL
);

-- Crear índice para la relación con ExerciseContent
CREATE INDEX "DevelopmentContent_exerciseContentId_idx" ON "DevelopmentContent"("exerciseContentId");

-- Agregar clave foránea
ALTER TABLE "DevelopmentContent" ADD CONSTRAINT "DevelopmentContent_exerciseContentId_fkey" FOREIGN KEY ("exerciseContentId") REFERENCES "ExerciseContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
