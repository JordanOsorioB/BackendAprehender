const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los progresos de materia por estudiante
const getStudentSubjectProgresses = async (req, res) => {
  try {
    const progresses = await prisma.studentSubjectProgress.findMany();
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo progreso de materias.", details: error.message });
  }
};

// Obtener progreso por ID
const getStudentSubjectProgressById = async (req, res) => {
  const { id } = req.params;
  try {
    const progress = await prisma.studentSubjectProgress.findUnique({ where: { id } });
    if (!progress) return res.status(404).json({ error: "Progreso no encontrado." });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo progreso.", details: error.message });
  }
};

// Crear nuevo progreso de materia
const createStudentSubjectProgress = async (req, res) => {
  const { studentId, subjectId, progress } = req.body;
  if (!studentId || !subjectId || progress == null) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newProgress = await prisma.studentSubjectProgress.create({
      data: { studentId, subjectId, progress },
    });
    res.json({ message: "Progreso creado con éxito.", progress: newProgress });
  } catch (error) {
    res.status(500).json({ error: "Error creando progreso.", details: error.message });
  }
};

// Actualizar progreso de materia
const updateStudentSubjectProgress = async (req, res) => {
  const { id } = req.params;
  const { studentId, subjectId, progress } = req.body;
  try {
    const updatedProgress = await prisma.studentSubjectProgress.update({
      where: { id },
      data: { studentId, subjectId, progress },
    });
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando progreso.", details: error.message });
  }
};

// Eliminar progreso de materia
const deleteStudentSubjectProgress = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.studentSubjectProgress.delete({ where: { id } });
    res.json({ message: "Progreso eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando progreso.", details: error.message });
  }
};

module.exports = { getStudentSubjectProgresses, getStudentSubjectProgressById, createStudentSubjectProgress, updateStudentSubjectProgress, deleteStudentSubjectProgress };
