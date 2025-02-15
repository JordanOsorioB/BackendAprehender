const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Registrar un curso
const createCourse = async (req, res) => {
  const { teacherId, establecimiento, direccion, curso, asignatura } = req.body;

  if (!teacherId || !establecimiento || !direccion || !curso || !asignatura) {
    return res
      .status(400)
      .json({ error: "⚠️ Todos los campos son obligatorios." });
  }

  try {
    const newCourse = await prisma.course.create({
      data: {
        teacherId,
        school: establecimiento,
        address: direccion,
        grade: curso,
        subject: asignatura,
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

module.exports = { createCourse, getCourses };
