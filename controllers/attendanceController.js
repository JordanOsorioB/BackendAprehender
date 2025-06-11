const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAttendances = async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        teacher: true,
        course: true,
        school: true
      }
    })
    res.json(attendances)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener asistencias' })
  }
}
