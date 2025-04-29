const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los estados de ejercicios
const getExerciseStates = async (req, res) => {
    try {
        const states = await prisma.exerciseState.findMany();
        res.json(states);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error obteniendo los estados de ejercicios." });
    }
};

// Crear un nuevo estado de ejercicio
const createExerciseState = async (req, res) => {
    const { completed, attempts, lastAttempt, correctAnswers, experienceEarned, locked, exerciseId, studentId } = req.body;
    if (!exerciseId || !studentId) {
        return res.status(400).json({ error: "⚠️ El ejercicio y el estudiante son obligatorios." });
    }

    try {
        const state = await prisma.exerciseState.create({
        data: { completed, attempts, lastAttempt, correctAnswers, experienceEarned, locked, exerciseId, studentId }
        });
        res.json({ message: "✅ Estado de ejercicio creado correctamente.", state });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creando el estado de ejercicio." });
    }
};

module.exports = { getExerciseStates, createExerciseState };
