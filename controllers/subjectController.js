//Controlador de subject
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las materias
const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo materias.", details: error.message });
  }
};

// Obtener materia por ID
const getSubjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) return res.status(404).json({ error: "Materia no encontrada." });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo materia.", details: error.message });
  }
};

// Crear materia con opción de asociarla a un curso
const createSubject = async (req, res) => {
  const { name, courseId } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es obligatorio." });

  try {
    const newSubject = await prisma.subject.create({
      data: {
        name,
        course: courseId ? { connect: { id: courseId } } : undefined,
      },
    });
    res.json({ message: "Materia creada con éxito.", subject: newSubject });
  } catch (error) {
    res.status(500).json({ error: "Error creando materia.", details: error.message });
  }
};

// Actualizar materia
const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: { name },
    });
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando materia.", details: error.message });
  }
};

// Eliminar materia
const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.subject.delete({ where: { id } });
    res.json({ message: "Materia eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando materia.", details: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};
