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
    completionStatus,
    attempts,
    lastAttempt,
    correctAnswers,
    experienceEarned,
    locked,
    respuesta,
  } = req.body;
  if (
    !studentId ||
    !exerciseId ||
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
        completionStatus: completionStatus || 'NOT_ANSWERED',
        attempts,
        lastAttempt: new Date(lastAttempt),
        correctAnswers,
        experienceEarned,
        locked,
        respuesta,
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
    completionStatus,
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
        completionStatus,
        attempts,
        lastAttempt: lastAttempt ? new Date(lastAttempt) : undefined,
        correctAnswers,
        experienceEarned,
        locked,
        respuesta,
      },
    });
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

// Comprar un intento extra usando 1 coin
const buyAttemptWithCoin = async (req, res) => {
  const { studentId, exerciseStateId } = req.body;
  if (!studentId || !exerciseStateId) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }
  try {
    // 1. Obtener estudiante
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) return res.status(404).json({ error: 'Estudiante no encontrado.' });
    if ((student.coins || 0) < 1) return res.status(400).json({ error: 'No tienes suficientes coins.' });

    // 2. Obtener estado del ejercicio
    const exerciseState = await prisma.exerciseState.findUnique({ where: { id: exerciseStateId } });
    if (!exerciseState) return res.status(404).json({ error: 'Estado de ejercicio no encontrado.' });
    if (exerciseState.attempts > 0) return res.status(400).json({ error: 'Aún tienes intentos disponibles.' });

    // 3. Descontar 1 coin y sumar 1 intento
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: { coins: { decrement: 1 } }
    });
    const updatedExerciseState = await prisma.exerciseState.update({
      where: { id: exerciseStateId },
      data: { attempts: { increment: 1 } }
    });

    res.json({
      message: 'Intento comprado con éxito.',
      coins: updatedStudent.coins,
      attempts: updatedExerciseState.attempts
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al comprar intento extra.' });
  }
};

module.exports = { getExerciseStates, getExerciseStateById, createExerciseState, updateExerciseState, deleteExerciseState, buyAttemptWithCoin };
