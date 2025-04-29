/*
    Creación de la tabla PairingContent (Contenido de términos pareados)
    Esta tabla se relaciona con ExerciseContent
*/

-- CreateTable
CREATE TABLE "PairingContent" (
    "id" SERIAL PRIMARY KEY,
    "instruction" TEXT NOT NULL,
    "exerciseContentId" INTEGER NOT NULL
);

-- Crear índice para la relación con ExerciseContent
CREATE INDEX "PairingContent_exerciseContentId_idx" ON "PairingContent"("exerciseContentId");

-- Agregar clave foránea
ALTER TABLE "PairingContent" ADD CONSTRAINT "PairingContent_exerciseContentId_fkey" FOREIGN KEY ("exerciseContentId") REFERENCES "ExerciseContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
