const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


 // Obtener todas las AlternativeOptions
 
const getAlternativeOptions = async (req, res) => {
  try {
    const options = await prisma.alternativeOption.findMany();
    res.json(options);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo alternative options.", details: error.message });
  }
};


 // Obtener AlternativeOption por ID
 
const getAlternativeOptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const option = await prisma.alternativeOption.findUnique({ where: { id: parseInt(id) } });
    if (!option) return res.status(404).json({ error: "AlternativeOption no encontrada." });
    res.json(option);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo alternative option.", details: error.message });
  }
};


 // Crear nueva AlternativeOption
 
const createAlternativeOption = async (req, res) => {
  const { text, exerciseId, isCorrect } = req.body;
  if (!text || !exerciseId) return res.status(400).json({ error: "Campos 'text' y 'exerciseId' son obligatorios." });

  try {
    const newOption = await prisma.alternativeOption.create({
      data: {
        text,
        exerciseId: parseInt(exerciseId),
        isCorrect: isCorrect ?? false,
      },
    });
    res.json({ message: "AlternativeOption creada.", alternativeOption: newOption });
  } catch (error) {
    res.status(500).json({ error: "Error creando alternative option.", details: error.message });
  }
};


 // Actualizar AlternativeOption por ID
 
const updateAlternativeOption = async (req, res) => {
  const { id } = req.params;
  const { text, exerciseId, isCorrect } = req.body;
  try {
    const updatedOption = await prisma.alternativeOption.update({
      where: { id: parseInt(id) },
      data: {
        text,
        exerciseId: exerciseId !== undefined ? parseInt(exerciseId) : undefined,
        isCorrect,
      },
    });
    res.json(updatedOption);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando alternative option.", details: error.message });
  }
};


 // Eliminar AlternativeOption por ID
 
const deleteAlternativeOption = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.alternativeOption.delete({ where: { id: parseInt(id) } });
    res.json({ message: "AlternativeOption eliminada." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando alternative option.", details: error.message });
  }
};



module.exports = { getAlternativeOptions, getAlternativeOptionById, createAlternativeOption, updateAlternativeOption, deleteAlternativeOption };
