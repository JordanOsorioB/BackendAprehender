const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las Units
const getUnits = async (req, res) => {
  try {
    const units = await prisma.unit.findMany();
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo unidades.", details: error.message });
  }
};

// Obtener Unit por ID
const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await prisma.unit.findUnique({ where: { id: parseInt(id) } });
    if (!unit) return res.status(404).json({ error: "Unidad no encontrada." });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo unidad.", details: error.message });
  }
};

// Crear una nueva Unit
const createUnit = async (req, res) => {
  const { title, description, order, courseId } = req.body;
  if (!title || !description || order === undefined || !courseId)
    return res.status(400).json({
      error: "Campos 'title', 'description', 'order' y 'courseId' son obligatorios.",
    });

  try {
    const newUnit = await prisma.unit.create({
      data: { title, description, order, courseId },
    });
    res.json({ message: "Unidad creada.", unit: newUnit });
  } catch (error) {
    res.status(500).json({ error: "Error creando unidad.", details: error.message });
  }
};

// Actualizar Unit por ID
const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { title, description, order } = req.body;

  try {
    const updatedUnit = await prisma.unit.update({
      where: { id: parseInt(id) },
      data: { title, description, order },
    });
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando unidad.", details: error.message });
  }
};

// Eliminar Unit por ID
const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.unit.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Unidad eliminada." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando unidad.", details: error.message });
  }
};

module.exports = { getUnits, getUnitById, createUnit, updateUnit, deleteUnit };
