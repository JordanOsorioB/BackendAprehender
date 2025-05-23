const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los ejercicios
const getExercises = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo ejercicios.", details: error.message });
  }
};

// Obtener ejercicio por ID
const getExerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await prisma.exercise.findUnique({ where: { id } });
    if (!exercise) return res.status(404).json({ error: "Ejercicio no encontrado." });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo ejercicio.", details: error.message });
  }
};

// Crear nuevo ejercicio
const createExercise = async (req, res) => {
  const { title, description, type, difficulty, totalExperience, subjectUnitId, content } = req.body;
  if (!title || !description || !type || !difficulty || totalExperience == null || !subjectUnitId || !content) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newExercise = await prisma.exercise.create({
      data: {
        title,
        description,
        type,
        difficulty,
        totalExperience,
        subjectUnitId,
        content,
      },
    });
    res.json({ message: "Ejercicio creado con éxito.", exercise: newExercise });
  } catch (error) {
    res.status(500).json({ error: "Error creando ejercicio.", details: error.message });
  }
};

// Actualizar ejercicio
const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { title, description, type, difficulty, totalExperience, subjectUnitId, content } = req.body;
  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: {
        title,
        description,
        type,
        difficulty,
        totalExperience,
        subjectUnitId,
        content,
      },
    });
    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando ejercicio.", details: error.message });
  }
};

// Eliminar ejercicio
const deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.exercise.delete({ where: { id } });
    res.json({ message: "Ejercicio eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando ejercicio.", details: error.message });
  }
};

module.exports = { getExercises, getExerciseById, createExercise, updateExercise, deleteExercise};
