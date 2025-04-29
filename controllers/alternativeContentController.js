const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los contenidos de tipo alternativas
const getAlternativeContents = async (req, res) => {
    try {
        const alternatives = await prisma.alternativeContent.findMany();
        res.json(alternatives);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los contenidos de alternativas." });
    }
};

// Crear un nuevo contenido de tipo alternativas
const createAlternativeContent = async (req, res) => {
    const { statement, exerciseContentId } = req.body;

    if (!statement || !exerciseContentId) {
        return res.status(400).json({ error: "⚠️ El enunciado y el ID del contenido del ejercicio son obligatorios." });
    }

    try {
        const alternativeContent = await prisma.alternativeContent.create({
        data: { statement, exerciseContentId }
        });
        res.json({ message: "✅ Contenido de alternativas creado correctamente.", alternativeContent });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el contenido de alternativas." });
    }
};

module.exports = { getAlternativeContents, createAlternativeContent };
