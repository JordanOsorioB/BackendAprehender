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
 * /exercise-statuses:
 *   get:
 *     tags: [ExerciseStates]
 *     summary: Obtiene todos los estados de ejercicios
 *     responses:
 *       200:
 *         description: Lista de estados de ejercicios
 *   post:
 *     tags: [ExerciseStates]
 *     summary: Crea un nuevo estado de ejercicio
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
 */
router.post("/", createExerciseState); // Crear nuevo estado de ejercicio
router.get("/", getExerciseStates);   // Obtener todos los estados

module.exports = router;
