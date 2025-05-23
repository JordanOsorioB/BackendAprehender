const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


 // Obtener todos los ExerciseContents

const getExerciseContents = async (req, res) => {
  try {
    const contents = await prisma.exerciseContent.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo exercise contents.", details: error.message });
  }
};

 // Obtener ExerciseContent por ID

const getExerciseContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await prisma.exerciseContent.findUnique({ where: { id: parseInt(id) } });
    if (!content) return res.status(404).json({ error: "ExerciseContent no encontrado." });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo exercise content.", details: error.message });
  }
};

 // Crear nuevo ExerciseContent

const createExerciseContent = async (req, res) => {
  const { content, exerciseId } = req.body;
  if (!content || !exerciseId) return res.status(400).json({ error: "Campos 'content' y 'exerciseId' son obligatorios." });

  try {
    const newContent = await prisma.exerciseContent.create({
      data: {
        content,
        exerciseId: parseInt(exerciseId),
      },
    });
    res.json({ message: "ExerciseContent creado.", exerciseContent: newContent });
  } catch (error) {
    res.status(500).json({ error: "Error creando exercise content.", details: error.message });
  }
};

 // Actualizar ExerciseContent por ID

const updateExerciseContent = async (req, res) => {
  const { id } = req.params;
  const { content, exerciseId } = req.body;
  try {
    const updatedContent = await prisma.exerciseContent.update({
      where: { id: parseInt(id) },
      data: {
        content,
        exerciseId: exerciseId !== undefined ? parseInt(exerciseId) : undefined,
      },
    });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando exercise content.", details: error.message });
  }
};

 // Eliminar ExerciseContent por ID

const deleteExerciseContent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.exerciseContent.delete({ where: { id: parseInt(id) } });
    res.json({ message: "ExerciseContent eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando exercise content.", details: error.message });
  }
};

module.exports = { getExerciseContents, getExerciseContentById, createExerciseContent, updateExerciseContent, deleteExerciseContent };
