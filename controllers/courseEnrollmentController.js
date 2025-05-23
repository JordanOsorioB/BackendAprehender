const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Obtener todas las inscripciones
const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.courseEnrollment.findMany();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo inscripciones.", details: error.message });
  }
};

// Obtener inscripción por ID
const getCourseEnrollmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await prisma.courseEnrollment.findUnique({ where: { id } });
    if (!enrollment) return res.status(404).json({ error: "Inscripción no encontrada." });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo inscripción.", details: error.message });
  }
};

// Crear una inscripción
const createCourseEnrollment = async (req, res) => {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).json({ error: "Faltan campos obligatorios: studentId, courseId." });
  }
  try {
    const newEnrollment = await prisma.courseEnrollment.create({
      data: { studentId, courseId },
    });
    res.json({ message: "Inscripción creada con éxito.", enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ error: "Error creando inscripción.", details: error.message });
  }
};

// Actualizar inscripción
const updateCourseEnrollment = async (req, res) => {
  const { id } = req.params;
  const { studentId, courseId } = req.body;
  try {
    const updatedEnrollment = await prisma.courseEnrollment.update({
      where: { id },
      data: { studentId, courseId },
    });
    res.json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando inscripción.", details: error.message });
  }
};

// Eliminar inscripción
const deleteCourseEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.courseEnrollment.delete({ where: { id } });
    res.json({ message: "Inscripción eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando inscripción.", details: error.message });
  }
};

module.exports = { 
  getCourseEnrollments,
  getCourseEnrollmentById,
  createCourseEnrollment,
  updateCourseEnrollment,
  deleteCourseEnrollment,
}