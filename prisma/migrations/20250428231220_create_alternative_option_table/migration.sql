/*
    Creación de la tabla AlternativeOption (Opciones de respuesta de alternativas)
    Esta tabla se relaciona con AlternativeContent
*/

-- CreateTable
CREATE TABLE "AlternativeOption" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "alternativeContentId" INTEGER NOT NULL,

    CONSTRAINT "AlternativeOption_pkey" PRIMARY KEY ("id")
);

-- Crear índice para la relación con AlternativeContent
CREATE INDEX "AlternativeOption_alternativeContentId_idx" ON "AlternativeOption"("alternativeContentId");

-- Agregar clave foránea
ALTER TABLE "AlternativeOption" ADD CONSTRAINT "AlternativeOption_alternativeContentId_fkey" FOREIGN KEY ("alternativeContentId") REFERENCES "AlternativeContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
