// controllers/studentController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const supabase = require('../supabase/client');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

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
  const { nombre, nick, level, experience } = req.body;
  if (!nombre || level === undefined || experience === undefined) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    const newStudent = await prisma.student.create({
      data: { nombre, nick, level, experience },
    });
    res.json({ message: "Estudiante creado con éxito.", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Error creando estudiante.", details: error.message });
  }
};

// Actualizar un estudiante
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { nombre, nick, level, experience } = req.body;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { nombre, nick, level, experience },
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

// Sumar experiencia y manejar nivel y recompensas
const addExperienceAndLevel = async (req, res) => {
  const { studentId, experienciaGanada } = req.body;
  if (!studentId || typeof experienciaGanada !== 'number') {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }
  try {
    // 1. Obtener estudiante
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) return res.status(404).json({ error: 'Estudiante no encontrado.' });

    // 2. Sumar experiencia
    let nuevaExperiencia = student.experience + experienciaGanada;
    let nuevoNivel = student.level;
    let levelUp = false;
    let premio = null;
    let monedasGanadas = 0;

    // 3. Obtener todos los niveles ordenados
    const levels = await prisma.level.findMany({ orderBy: { level: 'asc' } });
    if (!levels.length) return res.status(500).json({ error: 'No hay niveles definidos.' });

    // 4. Buscar el nivel más alto que le corresponde por experiencia
    let nivelCorrespondiente = levels
      .filter(lvl => nuevaExperiencia >= lvl.minXP && nuevaExperiencia <= lvl.maxXP)
      .sort((a, b) => b.level - a.level)[0];

    if (nivelCorrespondiente) {
      if (nivelCorrespondiente.level > student.level) {
        levelUp = true;
        nuevoNivel = nivelCorrespondiente.level;
        premio = {
          nivel: nivelCorrespondiente.level,
          unlockType: nivelCorrespondiente.unlockType,
          rewardAmount: nivelCorrespondiente.rewardAmount,
          description: nivelCorrespondiente.description
        };
        if (nivelCorrespondiente.rewardAmount) monedasGanadas = nivelCorrespondiente.rewardAmount;
      }
    }

    // 5. Actualizar estudiante
    const updateData = {
      experience: nuevaExperiencia,
      level: nuevoNivel,
    };
    if (monedasGanadas > 0) {
      updateData.coins = (student.coins || 0) + monedasGanadas;
    }
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: updateData,
    });

    res.json({
      student: updatedStudent,
      levelUp,
      premio,
      nivelCorrespondiente
    });
  } catch (error) {
    res.status(500).json({ error: 'Error sumando experiencia y nivel.', details: error.message });
  }
};

// Actualizar foto de perfil SOLO con URL
const uploadProfilePicture = async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const url = req.body.url;

    if (!studentId || !url) {
      return res.status(400).json({ error: 'Faltan datos obligatorios (studentId o url).' });
    }

    // Actualizar el estudiante en la base de datos
    await prisma.student.update({
      where: { id: studentId },
      data: { profilePicture: url }
    });

    return res.json({ url });
  } catch (err) {
    console.error('Error al actualizar foto de perfil:', err);
    return res.status(500).json({ error: 'Error interno al actualizar la foto de perfil.' });
  }
};

// Obtener todos los estudiantes con progreso y datos relevantes
const getStudentsWithProgress = async (req, res) => {
  try {
    // Traer todos los estudiantes y sus relaciones
    const students = await prisma.student.findMany({
      include: {
        courseEnrollments: { include: { course: true } },
        exerciseStates: true,
        subjectProgress: true, // Para obtener los subjectId
      },
    });

    // Para cada estudiante, calcular progreso y datos relevantes
    const result = students.map((student) => {
      // Cursos
      let cursos = [];
      try {
        cursos = student.courseEnrollments?.map(e => e.course?.name || null).filter(Boolean) || [];
      } catch (e) { cursos = []; }
      // Ejercicios asignados y respondidos
      let totalEjercicios = 0;
      let respondidos = 0;
      try {
        totalEjercicios = student.exerciseStates?.length || 0;
        respondidos = student.exerciseStates?.filter(e => e.completionStatus !== 'NOT_ANSWERED').length || 0;
      } catch (e) { totalEjercicios = 0; respondidos = 0; }
      // Progreso (porcentaje)
      const progreso = totalEjercicios > 0 ? Math.round((respondidos / totalEjercicios) * 100) : 0;
      // Fecha de registro (de la primera inscripción a curso, si existe)
      let registrado = null;
      try {
        if (student.courseEnrollments && student.courseEnrollments.length > 0) {
          registrado = student.courseEnrollments[0].createdAt?.toISOString().split('T')[0] || null;
        }
      } catch (e) { registrado = null; }
      // SubjectId (array de todos los subjectId asociados)
      let subjectId = [];
      try {
        subjectId = student.subjectProgress?.map(sp => sp.subjectId) || [];
      } catch (e) { subjectId = []; }
      return {
        id: student.id,
        nombre: student.nombre,
        profilePicture: student.profilePicture || null,
        nivel: student.level,
        experiencia: student.experience,
        cursos,
        progreso,
        respondidos,
        totalEjercicios,
        registrado,
        subjectId,
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo estudiantes con progreso.", details: error.message });
  }
};

// POST /students/bulk - Carga masiva de estudiantes
const bulkCreateStudents = async (req, res) => {
  try {
    const { estudiantes } = req.body;
    const { schoolId } = req.user; // Extraer del token JWT

    // Validar que el usuario sea UTP
    if (req.user.role !== 'UTP') {
      return res.status(403).json({
        success: false,
        message: 'Solo usuarios UTP pueden realizar carga masiva de estudiantes'
      });
    }

    // Validar que se envíen estudiantes
    if (!estudiantes || !Array.isArray(estudiantes) || estudiantes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de estudiantes'
      });
    }

    const results = {
      success: true,
      created: [],
      errors: []
    };

    // Procesar cada estudiante
    for (let i = 0; i < estudiantes.length; i++) {
      const estudiante = estudiantes[i];
      const rowNumber = i + 1;

      try {
        // Validaciones básicas
        if (!estudiante.nombre || estudiante.nombre.trim() === '') {
          results.errors.push({
            row: rowNumber,
            error: 'Nombre es requerido'
          });
          continue;
        }

        if (!estudiante.password || estudiante.password.length < 6) {
          results.errors.push({
            row: rowNumber,
            error: 'Contraseña debe tener al menos 6 caracteres'
          });
          continue;
        }

        if (!estudiante.courseId) {
          results.errors.push({
            row: rowNumber,
            error: 'courseId es requerido'
          });
          continue;
        }

        // Validar que el curso existe y pertenece a la escuela
        const course = await prisma.course.findFirst({
          where: {
            id: estudiante.courseId,
            schoolId: schoolId
          }
        });

        if (!course) {
          results.errors.push({
            row: rowNumber,
            error: 'courseId inválido o no pertenece a esta escuela'
          });
          continue;
        }

        // Generar email único
        const timestamp = Date.now();
        const emailBase = estudiante.nombre.toLowerCase().replace(/\s+/g, '');
        const email = `${emailBase}${timestamp}@zorrecursos.cl`;

        // Verificar que el email no exista
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if (existingUser) {
          results.errors.push({
            row: rowNumber,
            error: 'Email generado ya existe, intente de nuevo'
          });
          continue;
        }

        // Crear el estudiante
        const newStudent = await prisma.student.create({
          data: {
            nombre: estudiante.nombre.trim(),
            level: 1,
            experience: 1,
            coins: 0,
            profileType: 'STUDENT'
          }
        });

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(estudiante.password, 10);

        // Crear el usuario
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            schoolId,
            role: 'STUDENT',
            username: estudiante.nombre.trim(),
            studentId: newStudent.id
          }
        });

        // Crear la inscripción al curso
        await prisma.courseEnrollment.create({
          data: {
            studentId: newStudent.id,
            courseId: estudiante.courseId
          }
        });

        // Agregar a resultados exitosos
        results.created.push({
          nombre: estudiante.nombre,
          userId: newUser.id,
          studentId: newStudent.id,
          email: email
        });

      } catch (error) {
        console.error(`Error procesando estudiante ${rowNumber}:`, error);
        results.errors.push({
          row: rowNumber,
          error: 'Error interno procesando estudiante'
        });
      }
    }

    res.json(results);

  } catch (error) {
    console.error('Error en bulkCreateStudents:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
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
  addExperienceAndLevel,
  uploadProfilePicture,
  getStudentsWithProgress,
  bulkCreateStudents
};
