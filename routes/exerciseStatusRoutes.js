const express = require("express");
const { createExerciseState, getExerciseStates } = require("../controllers/exerciseStateController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExerciseStates
 *   description: Endpoints para estados de ejercicios
 */
/**
 * @swagger
 * /api/exercise-statuses:
 *   get:
 *     tags: [ExerciseStates]
 *     summary: Obtener todos los estados de ejercicios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estados de ejercicios
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [ExerciseStates]
 *     summary: Crea un nuevo estado de ejercicio
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               exerciseId:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               attempts:
 *                 type: integer
 *               lastAttempt:
 *                 type: string
 *                 format: date-time
 *               correctAnswers:
 *                 type: integer
 *               experienceEarned:
 *                 type: integer
 *               locked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estado de ejercicio creado
 *       401:
 *         description: No autorizado
 */
router.post("/", createExerciseState); // Crear nuevo estado de ejercicio
router.get("/", getExerciseStates);   // Obtener todos los estados

module.exports = router;
