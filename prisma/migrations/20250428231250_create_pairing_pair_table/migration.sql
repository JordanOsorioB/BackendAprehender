/*
    Creación de la tabla PairingPair (Pares de términos para ejercicios de términos pareados)
    Esta tabla se relaciona con PairingContent
*/

-- CreateTable
CREATE TABLE "PairingPair" (
    "id" SERIAL PRIMARY KEY,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "pairingContentId" INTEGER NOT NULL
);

-- Crear índice para la relación con PairingContent
CREATE INDEX "PairingPair_pairingContentId_idx" ON "PairingPair"("pairingContentId");

-- Agregar clave foránea
ALTER TABLE "PairingPair" ADD CONSTRAINT "PairingPair_pairingContentId_fkey" FOREIGN KEY ("pairingContentId") REFERENCES "PairingContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
