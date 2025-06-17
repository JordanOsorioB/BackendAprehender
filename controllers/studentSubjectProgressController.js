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

// Crear nuevo progreso de materia (masivo)
const createStudentSubjectProgress = async (req, res) => {
  const { actualizarMasivo } = req.body;
  if (!actualizarMasivo) {
    return res.status(400).json({ error: "El único body permitido es { actualizarMasivo: true }." });
  }

  try {
    const enrollments = await prisma.courseEnrollment.findMany();
    let totalRelacionesCreadas = 0;
    let totalExerciseStatesCreados = 0;
    let detalles = [];

    for (const enrollment of enrollments) {
      const { studentId, courseId } = enrollment;
      const subjects = await prisma.subject.findMany({ where: { courseId } });

      for (const subject of subjects) {
        const subjectId = subject.id;
        // 1. Verificar o crear la relación studentId-subjectId
        let progress = await prisma.studentSubjectProgress.findFirst({
          where: { studentId, subjectId }
        });

        if (!progress) {
          progress = await prisma.studentSubjectProgress.create({
            data: { studentId, subjectId, progress: 0 }
          });
          totalRelacionesCreadas++;
        }

        // 2. Buscar todas las unidades de la asignatura
        const subjectUnitsAsignatura = await prisma.subjectUnit.findMany({
          where: { subjectId }
        });

        // 3. Buscar todos los ejercicios de esas unidades
        const allExercises = [];
        for (const su of subjectUnitsAsignatura) {
          const exercises = await prisma.exercise.findMany({ where: { subjectUnitId: su.id } });
          allExercises.push(...exercises);
        }

        // 4. Crear ExerciseState para cada ejercicio que NO exista para ese estudiante
        const now = new Date();
        let nuevosExerciseStates = 0;
        for (const ex of allExercises) {
          const exists = await prisma.exerciseState.findFirst({
            where: { studentId, exerciseId: ex.id }
          });

          if (!exists) {
            await prisma.exerciseState.create({
              data: {
                studentId,
                exerciseId: ex.id,
                completionStatus: 'NOT_ANSWERED',
                attempts: 1,
                lastAttempt: now,
                correctAnswers: 0,
                experienceEarned: ex.totalExperience,
                locked: false,
                respuesta: null
              }
            });
            totalExerciseStatesCreados++;
            nuevosExerciseStates++;
          }
        }

        // Solo agrego al detalle si hubo nuevos ExerciseStates
        if (nuevosExerciseStates > 0) {
          detalles.push({ studentId, subjectId, ejercicios: nuevosExerciseStates });
        }
      }
    }

    res.json({
      message: `Proceso masivo finalizado. Relaciones creadas: ${totalRelacionesCreadas}, ExerciseStates creados: ${totalExerciseStatesCreados}`,
      detalles
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el proceso masivo.", details: error.message });
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

module.exports = {
  getStudentSubjectProgresses,
  getStudentSubjectProgressById,
  createStudentSubjectProgress,
  updateStudentSubjectProgress,
  deleteStudentSubjectProgress
};
