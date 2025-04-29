const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los contenidos de tipo desarrollo
const getDevelopmentContents = async (req, res) => {
    try {
        const developments = await prisma.developmentContent.findMany();
        res.json(developments);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los contenidos de desarrollo." });
    }
};

// Crear un nuevo contenido de tipo desarrollo
const createDevelopmentContent = async (req, res) => {
    const { statement, correctAnswer, keywords, matchPercentage, exerciseContentId } = req.body;

    if (!statement || !correctAnswer) {
        return res.status(400).json({ error: "⚠️ El enunciado y la respuesta correcta son obligatorios." });
    }

    try {
        const developmentContent = await prisma.developmentContent.create({
        data: { statement, correctAnswer, keywords, matchPercentage, exerciseContentId }
        });
        res.json({ message: "✅ Contenido de desarrollo creado correctamente.", developmentContent });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el contenido de desarrollo." });
    }
};

module.exports = { getDevelopmentContents, createDevelopmentContent };
