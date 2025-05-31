const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Endpoints para ejercicios
 */
/**
 * @swagger
 * /exercises:
 *   get:
 *     tags: [Exercises]
 *     summary: Obtiene todos los ejercicios
 *     responses:
 *       200:
 *         description: Lista de ejercicios
 *   post:
 *     tags: [Exercises]
 *     summary: Crea un nuevo ejercicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               totalExperience:
 *                 type: integer
 *               subjectUnitId:
 *                 type: integer
 *               content:
 *                 type: object
 *     responses:
 *       200:
 *         description: Ejercicio creado
 * /exercises/{id}:
 *   get:
 *     tags: [Exercises]
 *     summary: Obtiene un ejercicio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ejercicio encontrado
 */

router.get('/', exerciseController.getExercises);
router.get('/:id', exerciseController.getExerciseById);
router.post('/', exerciseController.createExercise);

module.exports = router;
