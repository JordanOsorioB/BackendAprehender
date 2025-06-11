const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getSessionLogs = async (req, res) => {
  try {
    const sessionLogs = await prisma.sessionLog.findMany({
      include: { user: true }
    })
    res.json(sessionLogs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener session logs' })
  }
}
