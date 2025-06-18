const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

const getStudentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId || typeof teacherId !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing teacherId parameter.' });
    }

    const students = await prisma.student.findMany({
      where: {
        courseEnrollments: {
          some: {
            course: {
              teacherId
            }
          }
        }
      },
      include: {
        user: {
          include: {
            school: true,
            sessionLogs: true
          }
        },
        courseEnrollments: {
          where: {
            course: {
              teacherId
            }
          },
          include: {
            course: {
              include: {
                units: {
                  include: {
                    subjectUnits: {
                      include: {
                        subject: true
                      }
                    }
                  }
                },
                teacher: true
              }
            }
          }
        }
      }
    });

    if (!students.length) {
      return res.status(404).json({ message: 'No students found for this teacherId.' });
    }

    const studentsWithTimes = students.map(student => {
      let totalMinutesConnected = 0;

      if (student.user?.sessionLogs && Array.isArray(student.user.sessionLogs)) {
        totalMinutesConnected = student.user.sessionLogs.reduce((sum, log) => {
          if (log.duration) return sum + log.duration;

          if (log.loginAt && log.logoutAt) {
            const login = new Date(log.loginAt);
            const logout = new Date(log.logoutAt);
            const diff = Math.floor((logout - login) / 60000); // minutos
            return sum + (diff > 0 ? diff : 0);
          }

          return sum;
        }, 0);
      }

      return {
        ...student,
        calculatedMinutes: totalMinutesConnected
      };
    });

    const totalMinutesAll = studentsWithTimes.reduce((sum, s) => sum + s.calculatedMinutes, 0);
    const totalHoursAll = totalMinutesAll / 60;

    const excelData = [];

    for (const student of studentsWithTimes) {
      const totalMinutes = student.calculatedMinutes;
      const totalHours = totalMinutes / 60;
      const percentage = totalHoursAll > 0 ? Math.round((totalHours / totalHoursAll) * 10000) / 100 : 0;

      for (const enrollment of student.courseEnrollments) {
        const course = enrollment.course;
        const completedAt = enrollment.completedAt
          ? new Date(enrollment.completedAt).toLocaleDateString('es-CL')
          : '';

        if (course?.units && course.units.length > 0) {
          const unitMap = new Map();

          course.units.forEach(unit => {
            unit.subjectUnits.forEach(subjectUnit => {
              const currentUnitId = unit.id;
              const unitName = unit.title || '';
              const subjectName = subjectUnit.subject?.name || '';
              const key = `${currentUnitId}-${subjectUnit.subjectId}`;

              if (!unitMap.has(key)) {
                unitMap.set(key, {
                  unitName,
                  subjectName
                });
              }
            });
          });

          unitMap.forEach((unitData) => {
            excelData.push({
              'Nombre del estudiante': student.nombre || '',
              'Nivel': student.level || 0,
              'Experiencia': student.experience || 0,
              'Curso': course?.name || '',
              'Fecha de término': completedAt,
              'Asignatura': unitData.subjectName,
              'Unidad': unitData.unitName,
              'Porcentaje': percentage,
              'Cantidad de horas conectado': Math.round(totalHours * 100) / 100
            });
          });
        } else {
          excelData.push({
            'Nombre del estudiante': student.nombre || '',
            'Nivel': student.level || 0,
            'Experiencia': student.experience || 0,
            'Curso': course?.name || '',
            'Fecha de término': completedAt,
            'Asignatura': '',
            'Unidad': '',
            'Porcentaje': percentage,
            'Cantidad de horas conectado': Math.round(totalHours * 100) / 100
          });
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    worksheet['!cols'] = [
      { wch: 25 },
      { wch: 8 },
      { wch: 12 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 12 },
      { wch: 25 }
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Actividad');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="reporte_actividad_${new Date().toISOString().split('T')[0]}.xlsx"`
    );

    res.send(buffer);
  } catch (error) {
    console.error('Error fetching students by teacher:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getStudentsByTeacher };