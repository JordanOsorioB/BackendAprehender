const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las opciones de alternativas
const getAlternativeOptions = async (req, res) => {
    try {
        const options = await prisma.alternativeOption.findMany();
        res.json(options);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo las opciones de alternativas." });
    }
};

// Crear una nueva opción de alternativa
const createAlternativeOption = async (req, res) => {
    const { optionId, text, isCorrect, alternativeContentId } = req.body;

    if (!optionId || !text) {
        return res.status(400).json({ error: "⚠️ El ID de opción y el texto son obligatorios." });
    }

    try {
        const alternativeOption = await prisma.alternativeOption.create({
        data: { optionId, text, isCorrect, alternativeContentId }
        });
        res.json({ message: "✅ Opción de alternativa creada correctamente.", alternativeOption });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando la opción de alternativa." });
    }
};

module.exports = { getAlternativeOptions, createAlternativeOption };
