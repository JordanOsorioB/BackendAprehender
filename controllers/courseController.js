const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Registrar un curso
const createCourse = async (req, res) => {
  const { name, schoolId, teacherId } = req.body;

  if (!name || !schoolId || !teacherId) {
    return res
      .status(400)
      .json({ error: "⚠️ Todos los campos son obligatorios (name, schoolId, teacherId)." });
  }

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        schoolId,
        teacherId,
      },
    });

    res.json({ message: "✅ Curso registrado con éxito.", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ error: "⚠️ Error registrando curso.", details: error.message });
  }
};
// Obtener todos los cursos
const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo cursos." });
  }
};

// Obtener curso por ID
const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) return res.status(404).json({ error: "Curso no encontrado." });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo curso.", details: error.message });
  }
};

// Actualizar curso
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, schoolId, teacherId } = req.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { name, schoolId, teacherId },
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando curso.", details: error.message });
  }
};

// Eliminar curso
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.course.delete({ where: { id } });
    res.json({ message: "Curso eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando curso.", details: error.message });
  }
};

module.exports = { createCourse, getCourses , getCourseById, updateCourse , deleteCourse};
