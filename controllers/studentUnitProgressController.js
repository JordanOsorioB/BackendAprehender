const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los progresos de unidad por estudiante
const getStudentUnitProgresses = async (req, res) => {
  try {
    const progresses = await prisma.studentUnitProgress.findMany();
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo progreso de unidades.", details: error.message });
  }
};

// Obtener progreso de unidad por ID
const getStudentUnitProgressById = async (req, res) => {
  const { id } = req.params;
  try {
    const progress = await prisma.studentUnitProgress.findUnique({ where: { id } });
    if (!progress) return res.status(404).json({ error: "Progreso no encontrado." });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo progreso.", details: error.message });
  }
};

// Crear nuevo progreso de unidad
const createStudentUnitProgress = async (req, res) => {
  const { studentId, unitId, progress } = req.body;
  if (!studentId || !unitId || progress == null) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newProgress = await prisma.studentUnitProgress.create({
      data: { studentId, unitId, progress },
    });
    res.json({ message: "Progreso creado con éxito.", progress: newProgress });
  } catch (error) {
    res.status(500).json({ error: "Error creando progreso.", details: error.message });
  }
};

// Actualizar progreso de unidad
const updateStudentUnitProgress = async (req, res) => {
  const { id } = req.params;
  const { studentId, unitId, progress } = req.body;
  try {
    const updatedProgress = await prisma.studentUnitProgress.update({
      where: { id },
      data: { studentId, unitId, progress },
    });
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando progreso.", details: error.message });
  }
};

// Eliminar progreso de unidad
const deleteStudentUnitProgress = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.studentUnitProgress.delete({ where: { id } });
    res.json({ message: "Progreso eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando progreso.", details: error.message });
  }
};

module.exports = {getStudentUnitProgresses, getStudentUnitProgressById, createStudentUnitProgress, updateStudentUnitProgress, deleteStudentUnitProgress}