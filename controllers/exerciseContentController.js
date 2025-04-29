const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los contenidos de ejercicios
const getExerciseContents = async (req, res) => {
    try {
        const contents = await prisma.exerciseContent.findMany();
        res.json(contents);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los contenidos de ejercicios." });
    }
};

// Crear un nuevo contenido de ejercicio
const createExerciseContent = async (req, res) => {
    const { type, exerciseId } = req.body;

    if (!type || !exerciseId) {
        return res.status(400).json({ error: "⚠️ El tipo y el ID del ejercicio son obligatorios." });
    }

    try {
        const content = await prisma.exerciseContent.create({
        data: { type, exerciseId }
        });
        res.json({ message: "✅ Contenido de ejercicio creado correctamente.", content });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el contenido del ejercicio." });
    }
};

module.exports = { getExerciseContents, createExerciseContent };
