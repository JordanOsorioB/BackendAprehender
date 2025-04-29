const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los contenidos de tipo términos pareados
const getPairingContents = async (req, res) => {
    try {
        const pairings = await prisma.pairingContent.findMany();
        res.json(pairings);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los contenidos de términos pareados." });
    }
};

// Crear un nuevo contenido de términos pareados
const createPairingContent = async (req, res) => {
    const { instruction, exerciseContentId } = req.body;

    if (!instruction) {
        return res.status(400).json({ error: "⚠️ La instrucción es obligatoria." });
    }

    try {
        const pairingContent = await prisma.pairingContent.create({
        data: { instruction, exerciseContentId }
        });
        res.json({ message: "✅ Contenido de términos pareados creado correctamente.", pairingContent });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el contenido de términos pareados." });
    }
};

module.exports = { getPairingContents, createPairingContent };
