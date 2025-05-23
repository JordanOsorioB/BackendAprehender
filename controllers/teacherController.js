const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los profesores
const getTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: { school: true, subject: true },
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo los profesores." });
  }
};

// Crear un nuevo profesor
const createTeacher = async (req, res) => {
  const { name, subjectId, schoolId, year } = req.body;
  if (!name || !subjectId || !schoolId || !year) {
    return res
      .status(400)
      .json({ error: "⚠️ Todos los campos son obligatorios." });
  }

  try {
    const teacher = await prisma.teacher.create({
      data: { name, subjectId, schoolId, year },
    });

    res.json({ message: "✅ Profesor creado correctamente.", teacher });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error creando el profesor." });
  }
};

// Obtener un profesor por ID
const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher)
      return res.status(404).json({ error: "⚠️ Profesor no encontrado." });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo el profesor." });
  }
};

// Eliminar profesor
const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.teacher.delete({ where: { id } });
    res.json({ message: "✅ Profesor eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error eliminando el profesor." });
  }
};

// Actualizar profesor
const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, subjectId, schoolId } = req.body;
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: { name, subjectId, schoolId },
    });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando profesor.", details: error.message });
  }
};

module.exports = { getTeachers, createTeacher, getTeacherById, deleteTeacher, updateTeacher };
