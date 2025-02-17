const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las asignaturas
const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo las asignaturas." });
  }
};

// Crear una nueva asignatura
const createSubject = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ error: "⚠️ El nombre de la asignatura es obligatorio." });
  }

  try {
    const subject = await prisma.subject.create({ data: { name } });
    res.json({ message: "✅ Asignatura creada correctamente.", subject });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error creando la asignatura." });
  }
};

module.exports = { getSubjects, createSubject };
