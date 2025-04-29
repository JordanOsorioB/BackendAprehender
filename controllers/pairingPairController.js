const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los pares de términos
const getPairingPairs = async (req, res) => {
    try {
        const pairs = await prisma.pairingPair.findMany();
        res.json(pairs);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los pares de términos." });
    }
};

// Crear un nuevo par de términos
const createPairingPair = async (req, res) => {
    const { pairId, term, definition, pairingContentId } = req.body;

    if (!term || !definition) {
        return res.status(400).json({ error: "⚠️ El término y la definición son obligatorios." });
    }

    try {
        const pairingPair = await prisma.pairingPair.create({
        data: { pairId, term, definition, pairingContentId }
        });
        res.json({ message: "✅ Par de términos creado correctamente.", pairingPair });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el par de términos." });
    }
};

module.exports = { getPairingPairs, createPairingPair };
