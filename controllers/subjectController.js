const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los estudiantes
const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo los estudiantes." });
  }
};

// Crear un nuevo estudiante
const createStudent = async (req, res) => {
  const { name, course, levelCurrent, experienceCurrent, experienceNeeded } = req.body;
  if (!name || !course) {
    return res.status(400).json({ error: "⚠️ El nombre y curso son obligatorios." });
  }

  try {
    const student = await prisma.student.create({
      data: { name, course, levelCurrent, experienceCurrent, experienceNeeded }
    });
    res.json({ message: "✅ Estudiante creado correctamente.", student });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error creando el estudiante." });
  }
};

module.exports = { getStudents, createStudent };
