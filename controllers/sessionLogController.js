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

exports.createSessionLog = async (req, res) => {
  try {
    const { userId, loginAt, logoutAt, duration } = req.body;
    const newLog = await prisma.sessionLog.create({
      data: { userId, loginAt, logoutAt, duration }
    });
    res.status(201).json(newLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear session log' });
  }
};

exports.getSessionLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const sessionLog = await prisma.sessionLog.findUnique({
      where: { id: Number(id) },
      include: { user: true }
    });
    if (!sessionLog) return res.status(404).json({ error: 'No encontrado' });
    res.json(sessionLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el session log' });
  }
};

exports.getSessionLogsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessionLogs = await prisma.sessionLog.findMany({
      where: { userId },
      include: { user: true }
    });
    res.json(sessionLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener session logs del usuario' });
  }
};

exports.updateSessionLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { loginAt, logoutAt, duration } = req.body;
    const updatedLog = await prisma.sessionLog.update({
      where: { id: Number(id) },
      data: { loginAt, logoutAt, duration }
    });
    res.json(updatedLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el session log' });
  }
};

exports.deleteSessionLog = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sessionLog.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Session log eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el session log' });
  }
};
