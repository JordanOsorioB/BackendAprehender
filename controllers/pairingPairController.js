const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

 // Obtener todos los PairingPairs

const getPairingPairs = async (req, res) => {
  try {
    const pairs = await prisma.pairingPair.findMany();
    res.json(pairs);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pairing pairs.", details: error.message });
  }
};

 // Obtener PairingPair por ID
 
 const getPairingPairById = async (req, res) => {
  const { id } = req.params;
  try {
    const pair = await prisma.pairingPair.findUnique({ where: { id: parseInt(id) } });
    if (!pair) return res.status(404).json({ error: "PairingPair no encontrado." });
    res.json(pair);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pairing pair.", details: error.message });
  }
};

 // Crear nuevo PairingPair

const createPairingPair = async (req, res) => {
  const { title, levelId, unitId } = req.body;
  if (!title || !levelId || !unitId)
    return res.status(400).json({ error: "Campos 'title', 'levelId' y 'unitId' son obligatorios." });

  try {
    const newPair = await prisma.pairingPair.create({
      data: { title, levelId: parseInt(levelId), unitId: parseInt(unitId) },
    });
    res.json({ message: "PairingPair creado.", pairingPair: newPair });
  } catch (error) {
    res.status(500).json({ error: "Error creando pairing pair.", details: error.message });
  }
};

 // Actualizar PairingPair por ID

const updatePairingPair = async (req, res) => {
  const { id } = req.params;
  const { title, levelId, unitId } = req.body;
  try {
    const updatedPair = await prisma.pairingPair.update({
      where: { id: parseInt(id) },
      data: { title, levelId: parseInt(levelId), unitId: parseInt(unitId) },
    });
    res.json(updatedPair);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando pairing pair.", details: error.message });
  }
};

 // Eliminar PairingPair por ID

const deletePairingPair = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pairingPair.delete({ where: { id: parseInt(id) } });
    res.json({ message: "PairingPair eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando pairing pair.", details: error.message });
  }
};
module.exports = { getPairingPairs, getPairingPairById, createPairingPair, updatePairingPair, deletePairingPair };
