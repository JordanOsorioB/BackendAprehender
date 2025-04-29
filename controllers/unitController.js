const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las unidades
const getUnits = async (req, res) => {
    try {
        const units = await prisma.unit.findMany();
        res.json(units);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo las unidades." });
    }
};

// Crear una nueva unidad
const createUnit = async (req, res) => {
    const { title, description, order, progress, subjectId } = req.body;

    if (!title || !subjectId) {
        return res.status(400).json({ error: "⚠️ El título y el ID de la asignatura son obligatorios." });
    }

    try {
        const unit = await prisma.unit.create({
        data: { title, description, order, progress, subjectId }
        });
        res.json({ message: "✅ Unidad creada correctamente.", unit });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando la unidad." });
    }
};

module.exports = { getUnits, createUnit };
