const { PrismaClient } = require('@prisma/client');
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
              teacherId: teacherId
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
          include: {
            course: {
              include: {
                subjects: true,
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
          if (log.duration) {
            return sum + log.duration;
          }

          if (log.loginAt && log.logoutAt) {
            const loginTime = new Date(log.loginAt);
            const logoutTime = new Date(log.logoutAt);
            const diffInMinutes = Math.floor((logoutTime - loginTime) / (1000 * 60));
            return sum + (diffInMinutes > 0 ? diffInMinutes : 0);
          }

          return sum;
        }, 0);
      }

      return {
        ...student,
        calculatedMinutes: totalMinutesConnected
      };
    });

    const totalMinutesAllStudents = studentsWithTimes.reduce((sum, student) => sum + student.calculatedMinutes, 0);
    const totalHoursAllStudents = totalMinutesAllStudents / 60;

    const data = studentsWithTimes.map(student => {
      const totalMinutesConnected = student.calculatedMinutes;
      const totalHoursConnected = totalMinutesConnected / 60;

      const percentageMinutes = totalMinutesAllStudents > 0
        ? Math.round((totalMinutesConnected / totalMinutesAllStudents) * 10000) / 100
        : 0;

      const percentageHours = totalHoursAllStudents > 0
        ? Math.round((totalHoursConnected / totalHoursAllStudents) * 10000) / 100
        : 0;

      const teacherEnrollment = student.courseEnrollments.find(enrollment =>
        enrollment.course && enrollment.course.teacherId === teacherId
      );

      const course = teacherEnrollment?.course;
      const firstSubject = course?.subjects?.[0];

      return {
        studentName: student.nombre,
        level: student.level,
        totalHoursConnected: Math.round(totalHoursConnected * 100) / 100,
        totalMinutesConnected,
        percentageHours,
        percentageMinutes,
        sessionCount: student.user?.sessionLogs?.length || 0,
        subjectName: firstSubject?.name || '',
        course: course?.name || '',
        teacherName: course?.teacher?.name || ''
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching students by teacher:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getStudentsByTeacher };