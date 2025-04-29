const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener progreso de estudiantes en asignaturas
const getStudentSubjectProgress = async (req, res) => {
    try {
        const progresses = await prisma.studentSubjectProgress.findMany();
        res.json(progresses);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo el progreso de estudiantes." });
    }
};

// Crear un nuevo progreso de estudiante en asignatura
const createStudentSubjectProgress = async (req, res) => {
    const { progress, studentId, subjectId } = req.body;
    if (!studentId || !subjectId) {
        return res.status(400).json({ error: "⚠️ El estudiante y la asignatura son obligatorios." });
    }

    try {
        const progressRecord = await prisma.studentSubjectProgress.create({
        data: { progress, studentId, subjectId }
        });
        res.json({ message: "✅ Progreso de estudiante creado correctamente.", progressRecord });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el progreso de estudiante." });
    }
};

module.exports = { getStudentSubjectProgress, createStudentSubjectProgress };
