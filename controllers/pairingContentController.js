const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

 // Obtener todos los PairingContents

const getPairingContents = async (req, res) => {
  try {
    const contents = await prisma.pairingContent.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pairing contents.", details: error.message });
  }
};

 // Obtener PairingContent por ID

const getPairingContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await prisma.pairingContent.findUnique({ where: { id: parseInt(id) } });
    if (!content) return res.status(404).json({ error: "PairingContent no encontrado." });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pairing content.", details: error.message });
  }
};

 // Crear nuevo PairingContent

const createPairingContent = async (req, res) => {
  const { content, pairingPairId } = req.body;
  if (!content || !pairingPairId)
    return res.status(400).json({ error: "Campos 'content' y 'pairingPairId' son obligatorios." });

  try {
    const newContent = await prisma.pairingContent.create({
      data: { content, pairingPairId: parseInt(pairingPairId) },
    });
    res.json({ message: "PairingContent creado.", pairingContent: newContent });
  } catch (error) {
    res.status(500).json({ error: "Error creando pairing content.", details: error.message });
  }
};

 // Actualizar PairingContent por ID

const updatePairingContent = async (req, res) => {
  const { id } = req.params;
  const { content, pairingPairId } = req.body;
  try {
    const updatedContent = await prisma.pairingContent.update({
      where: { id: parseInt(id) },
      data: { content, pairingPairId: parseInt(pairingPairId) },
    });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando pairing content.", details: error.message });
  }
};

 // Eliminar PairingContent por ID

const deletePairingContent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pairingContent.delete({ where: { id: parseInt(id) } });
    res.json({ message: "PairingContent eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando pairing content.", details: error.message });
  }
};


module.exports = { getPairingContents, getPairingContentById, createPairingContent, updatePairingContent, deletePairingContent};
