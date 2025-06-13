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
  if (!studentId || !subjectId) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    // Verificar si ya existe la relación
    let progressRecord = await prisma.studentSubjectProgress.findFirst({
      where: { studentId, subjectId }
    });
    let createdNewProgress = false;
    if (!progressRecord) {
      const progressValue = progress == null ? 0 : progress;
      progressRecord = await prisma.studentSubjectProgress.create({
        data: { studentId, subjectId, progress: progressValue },
      });
      createdNewProgress = true;
    }

    // Buscar todas las unidades de la asignatura
    const subjectUnits = await prisma.subjectUnit.findMany({
      where: { subjectId },
    });
    // Buscar todos los ejercicios de esas unidades
    const allExercises = [];
    for (const su of subjectUnits) {
      const exercises = await prisma.exercise.findMany({ where: { subjectUnitId: su.id } });
      allExercises.push(...exercises);
    }
    // Crear ExerciseState para cada ejercicio (solo si no existe)
    const now = new Date();
    await Promise.all(
      allExercises.map(async ex => {
        const exists = await prisma.exerciseState.findFirst({
          where: { studentId, exerciseId: ex.id }
        });
        if (!exists) {
          await prisma.exerciseState.create({
            data: {
              studentId,
              exerciseId: ex.id,
              completionStatus: 'NOT_ANSWERED',
              attempts: 0,
              lastAttempt: now,
              correctAnswers: 0,
              experienceEarned: 0,
              locked: false,
              respuesta: null
            }
          });
        }
      })
    );
    res.json({ 
      message: createdNewProgress ? "Progreso creado con éxito y estados de ejercicios inicializados." : "El progreso ya existía, pero se inicializaron los estados de ejercicios que faltaban.",
      progress: progressRecord 
    });
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