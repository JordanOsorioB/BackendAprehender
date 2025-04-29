/*
    Creación de la tabla Exercise (Ejercicios de la unidad)
    Esta tabla se relaciona con Unit
*/

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "totalExperience" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- Crear índice para la relación con Unit
CREATE INDEX "Exercise_unitId_idx" ON "Exercise"("unitId");

-- Agregar clave foránea
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
