const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los SubjectUnits
const getSubjectUnits = async (req, res) => {
  try {
    const units = await prisma.subjectUnit.findMany();
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo unidades de materia.", details: error.message });
  }
};

// Obtener SubjectUnit por ID
const getSubjectUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await prisma.subjectUnit.findUnique({ where: { id: parseInt(id) } });
    if (!unit) return res.status(404).json({ error: "Unidad no encontrada." });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo unidad.", details: error.message });
  }
};

// Crear un nuevo SubjectUnit
const createSubjectUnit = async (req, res) => {
  const { title, description, order, subjectId } = req.body;
  if (!title || !description || order == null || !subjectId) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newUnit = await prisma.subjectUnit.create({
      data: { title, description, order, subjectId },
    });
    res.json({ message: "Unidad creada con éxito.", unit: newUnit });
  } catch (error) {
    res.status(500).json({ error: "Error creando unidad.", details: error.message });
  }
};

// Actualizar SubjectUnit
const updateSubjectUnit = async (req, res) => {
  const { id } = req.params;
  const { title, description, order, subjectId } = req.body;
  try {
    const updatedUnit = await prisma.subjectUnit.update({
      where: { id: parseInt(id) },
      data: { title, description, order, subjectId },
    });
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando unidad.", details: error.message });
  }
};

// Eliminar SubjectUnit
const deleteSubjectUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.subjectUnit.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Unidad eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando unidad.", details: error.message });
  }
};


module.exports = { getSubjectUnits, createSubjectUnit, updateSubjectUnit, deleteSubjectUnit };
