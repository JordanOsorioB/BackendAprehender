const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los estados de ejercicios
const getExerciseStates = async (req, res) => {
  try {
    const states = await prisma.exerciseState.findMany();
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo estados de ejercicios.", details: error.message });
  }
};

// Obtener estado de ejercicio por ID
const getExerciseStateById = async (req, res) => {
  const { id } = req.params;
  try {
    const state = await prisma.exerciseState.findUnique({ where: { id } });
    if (!state) return res.status(404).json({ error: "Estado de ejercicio no encontrado." });
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo estado de ejercicio.", details: error.message });
  }
};

// Crear nuevo estado de ejercicio
const createExerciseState = async (req, res) => {
  const {
    studentId,
    exerciseId,
    completed,
    attempts,
    lastAttempt,
    correctAnswers,
    experienceEarned,
    locked,
  } = req.body;
  if (
    !studentId ||
    !exerciseId ||
    completed === undefined ||
    attempts == null ||
    !lastAttempt ||
    correctAnswers == null ||
    experienceEarned == null ||
    locked === undefined
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newState = await prisma.exerciseState.create({
      data: {
        studentId,
        exerciseId,
        completed,
        attempts,
        lastAttempt: new Date(lastAttempt),
        correctAnswers,
        experienceEarned,
        locked,
      },
    });
    res.json({ message: "Estado de ejercicio creado con éxito.", state: newState });
  } catch (error) {
    res.status(500).json({ error: "Error creando estado de ejercicio.", details: error.message });
  }
};

// Actualizar estado de ejercicio
const updateExerciseState = async (req, res) => {
  const { id } = req.params;
  const {
    studentId,
    exerciseId,
    completed,
    attempts,
    lastAttempt,
    correctAnswers,
    experienceEarned,
    locked,
    respuesta,
  } = req.body;
  try {
    const updatedState = await prisma.exerciseState.update({
      where: { id },
      data: {
        studentId,
        exerciseId,
        completed,
        attempts,
        lastAttempt: lastAttempt ? new Date(lastAttempt) : undefined,
        correctAnswers,
        experienceEarned,
        locked,
        respuesta,
      },
    });

    // Sumar experiencia al estudiante si corresponde
    if (completed === true && experienceEarned > 0 && studentId) {
      await prisma.student.update({
        where: { id: studentId },
        data: {
          experience: {
            increment: experienceEarned
          }
        }
      });
    }

    res.json(updatedState);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando estado de ejercicio.", details: error.message });
  }
};

// Eliminar estado de ejercicio
const deleteExerciseState = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.exerciseState.delete({ where: { id } });
    res.json({ message: "Estado de ejercicio eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando estado de ejercicio.", details: error.message });
  }
};

module.exports = { getExerciseStates, getExerciseStateById, createExerciseState, updateExerciseState, deleteExerciseState };
