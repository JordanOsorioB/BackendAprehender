const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

 // Obtener todos los Levels

const getLevels = async (req, res) => {
  try {
    const levels = await prisma.level.findMany();
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo niveles.", details: error.message });
  }
};

 // Obtener Level por ID

const getLevelById = async (req, res) => {
  const { id } = req.params;
  try {
    const level = await prisma.level.findUnique({ where: { id: parseInt(id) } });
    if (!level) return res.status(404).json({ error: "Nivel no encontrado." });
    res.json(level);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo nivel.", details: error.message });
  }
};

 // Crear un nuevo Level

const createLevel = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Campo 'name' es obligatorio." });

  try {
    const newLevel = await prisma.level.create({ data: { name } });
    res.json({ message: "Nivel creado.", level: newLevel });
  } catch (error) {
    res.status(500).json({ error: "Error creando nivel.", details: error.message });
  }
};

 // Actualizar Level por ID

const updateLevel = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedLevel = await prisma.level.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedLevel);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando nivel.", details: error.message });
  }
};

 // Eliminar Level por ID
 
const deleteLevel = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.level.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Nivel eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando nivel.", details: error.message });
  }
};


module.exports = { getLevels, getLevelById,  createLevel, updateLevel, deleteLevel };
