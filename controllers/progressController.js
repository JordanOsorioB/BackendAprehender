const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Obtener todos los progresos
const getProgresses = async (req, res) => {
  try {
    const progresses = await prisma.progress.findMany();
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo progresos.", details: error.message });
  }
};

// Obtener progreso por ID
const getProgressById = async (req, res) => {
  const { id } = req.params;
  try {
    const progress = await prisma.progress.findUnique({ where: { id } });
    if (!progress) return res.status(404).json({ error: "Progreso no encontrado." });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo progreso.", details: error.message });
  }
};

// Crear progreso
const createProgress = async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) return res.status(400).json({ error: "courseId es obligatorio." });
  try {
    const newProgress = await prisma.progress.create({ data: { courseId } });
    res.json({ message: "Progreso creado con éxito.", progress: newProgress });
  } catch (error) {
    res.status(500).json({ error: "Error creando progreso.", details: error.message });
  }
};

// Actualizar progreso
const updateProgress = async (req, res) => {
  const { id } = req.params;
  const { courseId } = req.body;
  try {
    const updatedProgress = await prisma.progress.update({
      where: { id },
      data: { courseId },
    });
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando progreso.", details: error.message });
  }
};

// Eliminar progreso
const deleteProgress = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.progress.delete({ where: { id } });
    res.json({ message: "Progreso eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando progreso.", details: error.message });
  }
};

module.exports = {
  getProgresses,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
};
