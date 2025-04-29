/*
    Creación de la tabla Unit (Unidades de la asignatura)
    Esta tabla se relaciona con Subject
*/

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "subjectId" TEXT NOT NULL
);

-- Crear índice para la relación con Subject
CREATE INDEX "Unit_subjectId_idx" ON "Unit"("subjectId");

-- Agregar clave foránea
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
