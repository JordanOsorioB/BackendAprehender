const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para obtener el número de días en un mes
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Función para obtener el nombre del mes en español
const getMonthName = (month) => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return months[month - 1];
};

// Controlador principal para generar el reporte CSV
const generateAttendanceReportCSV = async (req, res) => {
  try {
    const { schoolId, courseId, year } = req.query;

    // Validar parámetros requeridos
    if (!schoolId || !courseId || !year) {
      return res.status(400).json({
        error: 'Parámetros requeridos: schoolId, courseId, year'
      });
    }

    // Obtener información del curso y escuela
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        school: true,
        enrollments: {
          include: {
            student: true
          },
          orderBy: {
            student: {
              nombre: 'asc'
            }
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Verificar que el curso pertenece a la escuela
    if (course.schoolId !== schoolId) {
      return res.status(400).json({ error: 'El curso no pertenece a la escuela especificada' });
    }

    // Generar CSV para cada mes (marzo a diciembre)
    const csvSheets = [];
    
    for (let month = 3; month <= 12; month++) {
      const monthName = getMonthName(month);
      const daysInMonth = getDaysInMonth(parseInt(year), month);
      
      // Obtener registros de asistencia para el mes
      const attendanceRecords = await prisma.attendanceReport.findMany({
        where: {
          schoolId,
          courseId,
          year: parseInt(year),
          month: month
        },
        include: {
          student: true
        }
      });

      // Crear mapa de asistencia para acceso rápido
      const attendanceMap = new Map();
      attendanceRecords.forEach(record => {
        const key = `${record.studentId}-${record.day}`;
        attendanceMap.set(key, record.isPresent);
      });

      // Generar encabezado del CSV
      let csvContent = `Curso,Alumno,`;
      for (let day = 1; day <= daysInMonth; day++) {
        csvContent += `${day},`;
      }
      csvContent += `Total asistencia,Total ausencia\n`;

      // Generar filas para cada estudiante (usando enrollments)
      course.enrollments.forEach(enrollment => {
        const student = enrollment.student;
        let totalPresent = 0;
        let totalAbsent = 0;
        
        let row = `"${course.name}","${student.nombre}",`;
        
        for (let day = 1; day <= daysInMonth; day++) {
          const key = `${student.id}-${day}`;
          const isPresent = attendanceMap.get(key);
          
          if (isPresent === true) {
            row += '1,';
            totalPresent++;
          } else if (isPresent === false) {
            row += '0,';
            totalAbsent++;
          } else {
            row += ','; // Sin registro
          }
        }
        
        row += `${totalPresent},${totalAbsent}\n`;
        csvContent += row;
      });

      csvSheets.push({
        month: monthName,
        content: csvContent
      });
    }

    // Configurar respuesta HTTP para descarga
    const filename = `reporte_asistencia_${course.name}_${year}.csv`;
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Para este ejemplo, concatenamos todas las hojas en un archivo
    // En un caso real, podrías usar una librería como 'xlsx' para generar múltiples hojas
    let finalCSV = '';
    csvSheets.forEach(sheet => {
      finalCSV += `\n=== ${sheet.month.toUpperCase()} ===\n`;
      finalCSV += sheet.content;
      finalCSV += '\n';
    });

    res.send(finalCSV);

  } catch (error) {
    console.error('Error generando reporte de asistencia:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor al generar el reporte' 
    });
  }
};

// Función auxiliar para generar un reporte de un mes específico
const generateMonthlyAttendanceReport = async (req, res) => {
  try {
    const { schoolId, courseId, year, month } = req.query;

    if (!schoolId || !courseId || !year || !month) {
      return res.status(400).json({
        error: 'Parámetros requeridos: schoolId, courseId, year, month'
      });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        school: true,
        enrollments: {
          include: {
            student: true
          },
          orderBy: {
            student: {
              nombre: 'asc'
            }
          }
        }
      }
    });

    if (!course || course.schoolId !== schoolId) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    const monthName = getMonthName(parseInt(month));
    const daysInMonth = getDaysInMonth(parseInt(year), parseInt(month));
    
    const attendanceRecords = await prisma.attendanceReport.findMany({
      where: {
        schoolId,
        courseId,
        year: parseInt(year),
        month: parseInt(month)
      },
      include: {
        student: true
      }
    });

    const attendanceMap = new Map();
    attendanceRecords.forEach(record => {
      const key = `${record.studentId}-${record.day}`;
      attendanceMap.set(key, record.isPresent);
    });

    let csvContent = `Curso,Alumno,`;
    for (let day = 1; day <= daysInMonth; day++) {
      csvContent += `${day},`;
    }
    csvContent += `Total asistencia,Total ausencia\n`;

    course.enrollments.forEach(enrollment => {
      const student = enrollment.student;
      let totalPresent = 0;
      let totalAbsent = 0;
      
      let row = `"${course.name}","${student.nombre}",`;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const key = `${student.id}-${day}`;
        const isPresent = attendanceMap.get(key);
        
        if (isPresent === true) {
          row += '1,';
          totalPresent++;
        } else if (isPresent === false) {
          row += '0,';
          totalAbsent++;
        } else {
          row += ',';
        }
      }
      
      row += `${totalPresent},${totalAbsent}\n`;
      csvContent += row;
    });

    const filename = `reporte_asistencia_${course.name}_${monthName}_${year}.csv`;
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);

  } catch (error) {
    console.error('Error generando reporte mensual:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor al generar el reporte mensual' 
    });
  }
};

// Función para obtener estadísticas de asistencia
const getAttendanceStats = async (req, res) => {
  try {
    const { schoolId, courseId, year } = req.query;

    if (!schoolId || !courseId || !year) {
      return res.status(400).json({
        error: 'Parámetros requeridos: schoolId, courseId, year'
      });
    }

    const stats = await prisma.attendanceReport.groupBy({
      by: ['month', 'studentId'],
      where: {
        schoolId,
        courseId,
        year: parseInt(year)
      },
      _count: {
        isPresent: true
      },
      _sum: {
        isPresent: true
      }
    });

    const studentStats = await prisma.attendanceReport.groupBy({
      by: ['studentId'],
      where: {
        schoolId,
        courseId,
        year: parseInt(year)
      },
      _count: {
        _all: true
      },
      _sum: {
        isPresent: true
      }
    });

    res.json({
      monthlyStats: stats,
      studentStats: studentStats
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor al obtener estadísticas' 
    });
  }
};

module.exports = {
  generateAttendanceReportCSV,
  generateMonthlyAttendanceReport,
  getAttendanceStats
};