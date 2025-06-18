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

// Obtener actividad de estudiantes por subjectId y últimos 7 días (UTC-4)
exports.getSubjectActivity = async (req, res) => {
  const { subjectId } = req.query;
  if (!subjectId) {
    return res.status(400).json({ error: 'Falta parámetro: subjectId' });
  }
  try {
    // 1. Buscar todos los studentId con ese subjectId
    const studentProgress = await prisma.studentSubjectProgress.findMany({
      where: { subjectId },
      select: { studentId: true }
    });
    const studentIds = studentProgress.map(sp => sp.studentId);
    if (studentIds.length === 0) return res.json([]);

    // 2. Buscar los usuarios correspondientes a esos studentId
    const users = await prisma.user.findMany({
      where: { studentId: { in: studentIds } },
      select: { id: true, studentId: true, student: { select: { nombre: true, profilePicture: true } } }
    });
    const studentInfo = Object.fromEntries(users.map(u => [u.studentId, { nombre: u.student?.nombre || '', profilePicture: u.student?.profilePicture || null }]));
    const userIds = users.map(u => u.id);
    if (userIds.length === 0) return res.json([]);

    // 3. Calcular rango de los últimos 7 días hasta mañana (UTC-4)
    const offset = 4 * 60; // minutos
    const hoy = new Date();
    const hoyLocal = new Date(hoy.getTime() - offset * 60000);
    hoyLocal.setHours(0, 0, 0, 0);
    const fechaInicio = new Date(hoyLocal);
    fechaInicio.setDate(fechaInicio.getDate() - 6); // 7 días atrás
    const fechaFin = new Date(hoyLocal);
    fechaFin.setDate(fechaFin.getDate() + 1); // mañana
    fechaFin.setHours(23, 59, 59, 999);

    // 4. Traer logs de ese rango extendido
    const logs = await prisma.sessionLog.findMany({
      where: {
        userId: { in: userIds },
        loginAt: { gte: fechaInicio, lte: fechaFin }
      }
    });

    // 5. Generar set de fechas válidas (YYYY-MM-DD)
    const fechasValidas = [];
    let fechaCursor = new Date(fechaInicio);
    while (fechaCursor <= fechaFin) {
      const localDate = new Date(fechaCursor.getTime());
      fechasValidas.push(localDate.toISOString().split('T')[0]);
      fechaCursor.setDate(fechaCursor.getDate() + 1);
    }
    const fechaHoyStr = hoyLocal.toISOString().split('T')[0];
    const fechaManana = new Date(hoyLocal);
    fechaManana.setDate(fechaManana.getDate() + 1);
    const fechaMananaStr = fechaManana.toISOString().split('T')[0];

    // 6. Agrupar por userId y por día local (UTC-4), solo sumar logs reales de cada usuario
    const result = users.map(u => {
      // Filtrar logs de este usuario
      const logsUsuario = logs.filter(l => l.userId === u.id);
      // Agrupar por día local
      const dias = {};
      logsUsuario.forEach(l => {
        const localDate = new Date(l.loginAt.getTime() - offset * 60000);
        let fecha = localDate.toISOString().split('T')[0];
        // Si es fecha de mañana, agrupar como hoy
        if (fecha === fechaMananaStr) fecha = fechaHoyStr;
        if (!fechasValidas.includes(fecha)) return;
        if (!dias[fecha]) dias[fecha] = { fecha, cantidad: 0, duracion: 0 };
        dias[fecha].cantidad++;
        dias[fecha].duracion += l.duration || 0;
      });
      return {
        userId: u.id,
        studentId: u.studentId,
        nombre: studentInfo[u.studentId]?.nombre || '',
        profilePicture: studentInfo[u.studentId]?.profilePicture || null,
        cantidadLogs: Object.values(dias).reduce((acc, d) => acc + d.cantidad, 0),
        duracionTotal: Object.values(dias).reduce((acc, d) => acc + d.duracion, 0),
        dias: Object.values(dias)
      };
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo actividad por subjectId', details: error.message });
  }
};
