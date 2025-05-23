// controllers/studentController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los estudiantes
const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo estudiantes.", details: error.message });
  }
};

// Obtener un estudiante por ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return res.status(404).json({ error: "Estudiante no encontrado." });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo estudiante.", details: error.message });
  }
};

// Crear un estudiante
const createStudent = async (req, res) => {
  const { nombre, level, experience } = req.body;
  if (!nombre || level === undefined || experience === undefined) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newStudent = await prisma.student.create({
      data: { nombre, level, experience },
    });
    res.json({ message: "Estudiante creado con éxito.", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Error creando estudiante.", details: error.message });
  }
};

// Actualizar un estudiante
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { nombre, level, experience } = req.body;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { nombre, level, experience },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando estudiante.", details: error.message });
  }
};

// Eliminar un estudiante
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({ where: { id } });
    res.json({ message: "Estudiante eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando estudiante.", details: error.message });
  }
};

// Obtener lista de cursos por estudiente
const getStudentCourses = async (req, res) => {
  const { id } = req.params;
  try {
    const courses = await prisma.courseEnrollment.findMany({
      where: { studentId: id },
      include: { course: true },
    });
    res.json(courses.map(e => e.course));
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo cursos del estudiante." });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentCourses,
};
