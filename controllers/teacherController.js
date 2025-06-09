const { PrismaClient, ProfileType } = require("@prisma/client");
const prisma = new PrismaClient();

const getTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        subject: true,
        school: true,
      },
    });
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los profesores." });
  }
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        subject: true,
        school: true,
      },
    });
    if (!teacher) {
      return res.status(404).json({ error: "Profesor no encontrado." });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el profesor." });
  }
};

const createTeacher = async (req, res) => {
  const { name, subjectId, schoolId, profileType } = req.body;

  if (!name || !subjectId || !schoolId || !profileType) {
    return res
      .status(400)
      .json({ error: "⚠️ Todos los campos son obligatorios." });
  }

  try {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        subjectId,
        schoolId,
        profileType: ProfileType[profileType.toUpperCase().trim()], // ✅ Conversión correcta a enum
      },
    });

    res.json({ message: "✅ Profesor creado correctamente.", teacher });
  } catch (error) {
    console.error("Error en createTeacher:", error); // ✅ log del error completo
    res.status(500).json({ error: "⚠️ Error creando el profesor.", details: error.message });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, subjectId, schoolId, profileType } = req.body;

  try {
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        name,
        subjectId,
        schoolId,
        profileType: profileType ? ProfileType[profileType] : undefined, // ✅ manejar el update con enum
      },
    });
    res.json({ message: "✅ Profesor actualizado correctamente.", teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "⚠️ Error actualizando el profesor." });
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.teacher.delete({ where: { id } });
    res.json({ message: "✅ Profesor eliminado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "⚠️ Error eliminando el profesor." });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
