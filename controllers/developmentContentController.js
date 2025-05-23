const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

 // Obtener todos los DevelopmentContents

const getDevelopmentContents = async (req, res) => {
  try {
    const contents = await prisma.developmentContent.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo development contents.", details: error.message });
  }
};

 // Obtener DevelopmentContent por ID

const getDevelopmentContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await prisma.developmentContent.findUnique({ where: { id: parseInt(id) } });
    if (!content) return res.status(404).json({ error: "DevelopmentContent no encontrado." });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo development content.", details: error.message });
  }
};

 // Crear nuevo DevelopmentContent

const createDevelopmentContent = async (req, res) => {
  const { title, description, content, unitId } = req.body;
  if (!title || !content || !unitId)
    return res.status(400).json({ error: "Campos 'title', 'content' y 'unitId' son obligatorios." });

  try {
    const newContent = await prisma.developmentContent.create({
      data: { title, description, content, unitId: parseInt(unitId) },
    });
    res.json({ message: "DevelopmentContent creado.", developmentContent: newContent });
  } catch (error) {
    res.status(500).json({ error: "Error creando development content.", details: error.message });
  }
};

 // Actualizar DevelopmentContent por ID

const updateDevelopmentContent = async (req, res) => {
  const { id } = req.params;
  const { title, description, content, unitId } = req.body;
  try {
    const updatedContent = await prisma.developmentContent.update({
      where: { id: parseInt(id) },
      data: { title, description, content, unitId: parseInt(unitId) },
    });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando development content.", details: error.message });
  }
};

 // Eliminar DevelopmentContent por ID

const deleteDevelopmentContent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.developmentContent.delete({ where: { id: parseInt(id) } });
    res.json({ message: "DevelopmentContent eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando development content.", details: error.message });
  }
};

module.exports = { getDevelopmentContents, getDevelopmentContentById, createDevelopmentContent, updateDevelopmentContent, deleteDevelopmentContent };
