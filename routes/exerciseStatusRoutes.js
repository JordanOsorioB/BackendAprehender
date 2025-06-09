const express = require("express");
const { createExerciseState, getExerciseStates, updateExerciseState } = require("../controllers/exerciseStateController");

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
 *               completionStatus:
 *                 type: string
 *                 enum: [NOT_ANSWERED, CORRECT, INCORRECT]
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
 *               respuesta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado de ejercicio creado
 *       401:
 *         description: No autorizado
 */
/**
 * @swagger
 * /api/exercise-statuses/{id}:
 *   patch:
 *     tags: [ExerciseStates]
 *     summary: Actualiza un estado de ejercicio
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estado de ejercicio
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
 *               completionStatus:
 *                 type: string
 *                 enum: [NOT_ANSWERED, CORRECT, INCORRECT]
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
 *               respuesta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado de ejercicio actualizado
 *       404:
 *         description: No encontrado
 *       401:
 *         description: No autorizado
 */
router.post("/", createExerciseState); // Crear nuevo estado de ejercicio
router.get("/", getExerciseStates);   // Obtener todos los estados
router.patch("/:id", updateExerciseState); // Actualizar estado de ejercicio

module.exports = router;
