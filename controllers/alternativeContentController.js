const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


 // Obtener todos los AlternativeContents
 
const getAlternativeContents = async (req, res) => {
  try {
    const contents = await prisma.alternativeContent.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo alternative contents.", details: error.message });
  }
};


 // Obtener AlternativeContent por ID
 
const getAlternativeContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await prisma.alternativeContent.findUnique({ where: { id: parseInt(id) } });
    if (!content) return res.status(404).json({ error: "AlternativeContent no encontrado." });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo alternative content.", details: error.message });
  }
};


 // Crear nuevo AlternativeContent
 
const createAlternativeContent = async (req, res) => {
  const { content, alternativeOptionId } = req.body;
  if (!content || !alternativeOptionId) return res.status(400).json({ error: "Campos 'content' y 'alternativeOptionId' son obligatorios." });

  try {
    const newContent = await prisma.alternativeContent.create({
      data: {
        content,
        alternativeOptionId: parseInt(alternativeOptionId),
      },
    });
    res.json({ message: "AlternativeContent creado.", alternativeContent: newContent });
  } catch (error) {
    res.status(500).json({ error: "Error creando alternative content.", details: error.message });
  }
};


 // Actualizar AlternativeContent por ID
 
const updateAlternativeContent = async (req, res) => {
  const { id } = req.params;
  const { content, alternativeOptionId } = req.body;
  try {
    const updatedContent = await prisma.alternativeContent.update({
      where: { id: parseInt(id) },
      data: {
        content,
        alternativeOptionId: alternativeOptionId !== undefined ? parseInt(alternativeOptionId) : undefined,
      },
    });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando alternative content.", details: error.message });
  }
};


 // Eliminar AlternativeContent por ID
 
const deleteAlternativeContent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.alternativeContent.delete({ where: { id: parseInt(id) } });
    res.json({ message: "AlternativeContent eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando alternative content.", details: error.message });
  }
};


module.exports = { getAlternativeContents, getAlternativeContentById, createAlternativeContent, updateAlternativeContent, deleteAlternativeContent };
