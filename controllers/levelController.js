const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los niveles
const getLevels = async (req, res) => {
    try {
        const levels = await prisma.level.findMany();
        res.json(levels);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los niveles." });
    }
};

// Crear un nuevo nivel
const createLevel = async (req, res) => {
    const { current, currentExperience, requiredExperience, studentId } = req.body;

    try {
        const level = await prisma.level.create({
        data: { current, currentExperience, requiredExperience, studentId }
        });
        res.json({ message: "✅ Nivel creado correctamente.", level });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el nivel." });
    }
};

module.exports = { getLevels, createLevel };
