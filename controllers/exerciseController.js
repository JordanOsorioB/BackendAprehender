const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los ejercicios
const getExercises = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo los ejercicios." });
  }
};

// Crear un nuevo ejercicio
const createExercise = async (req, res) => {
  const { title, description, type, difficulty, totalExperience, unitId } = req.body;
  if (!title || !type || !difficulty || !unitId) {
    return res.status(400).json({ error: "⚠️ El título, tipo, dificultad y unidad son obligatorios." });
  }

  try {
    const exercise = await prisma.exercise.create({
      data: { title, description, type, difficulty, totalExperience, unitId }
    });
    res.json({ message: "✅ Ejercicio creado correctamente.", exercise });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error creando el ejercicio." });
  }
};

module.exports = { getExercises, createExercise };
