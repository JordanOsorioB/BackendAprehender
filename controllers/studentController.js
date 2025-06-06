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

// Obtener toda la info anidada de un estudiante (mock style)
const getStudentFullData = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Buscar el estudiante base
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return res.status(404).json({ error: "Estudiante no encontrado." });

    // 2. Buscar subjectProgress (puede ser vacío)
    const subjectProgress = await prisma.studentSubjectProgress.findMany({
      where: { studentId: id },
    });

    // 3. Para cada subjectProgress, buscar el subject y sus unidades
    const subjectProgressFull = await Promise.all(subjectProgress.map(async (sp) => {
      // Buscar subject
      const subject = await prisma.subject.findUnique({
        where: { id: sp.subjectId },
      });
      // Buscar unidades de la asignatura
      const subjectUnits = await prisma.subjectUnit.findMany({
        where: { subjectId: sp.subjectId },
      });
      // Para cada unidad, buscar la unidad y sus ejercicios
      const units = await Promise.all(subjectUnits.map(async (su) => {
        const unit = await prisma.unit.findUnique({ where: { id: su.unitId } });
        if (!unit) return { id: su.unitId, titulo: 'Sin unidad', ejercicios: [] };
        // Buscar ejercicios de la unidad
        const exercises = await prisma.exercise.findMany({ where: { subjectUnitId: su.id } });
        // Para cada ejercicio, buscar estados
        const exercisesFull = await Promise.all(exercises.map(async (ex) => {
          const states = await prisma.exerciseState.findMany({
            where: { exerciseId: ex.id, studentId: id },
          });
          return { ...ex, states: states || [] };
        }));
        return { ...unit, ejercicios: exercisesFull };
      }));
      return {
        ...sp,
        subject: subject ? { ...subject, units } : { id: sp.subjectId, nombre: 'Sin asignatura', units: [] },
      };
    }));

    // 4. Armar el objeto final
    const result = {
      ...student,
      subjectProgress: subjectProgressFull.length > 0 ? subjectProgressFull : [],
    };
    console.log('Resultado de student:', result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo datos completos del estudiante.", details: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentCourses,
  getStudentFullData,
};
