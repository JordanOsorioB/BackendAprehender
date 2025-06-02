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
 * /api/exercises:
 *   get:
 *     tags: [Exercises]
 *     summary: Obtener todos los ejercicios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ejercicios
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Exercises]
 *     summary: Crea un nuevo ejercicio
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 *
 * /api/exercises/{id}:
 *   get:
 *     tags: [Exercises]
 *     summary: Obtener un ejercicio por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ejercicio encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Ejercicio no encontrado
 *   put:
 *     tags: [Exercises]
 *     summary: Actualiza un ejercicio por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del ejercicio
 *     responses:
 *       200:
 *         description: Ejercicio actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Exercises]
 *     summary: Elimina un ejercicio por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ejercicio eliminado
 *       401:
 *         description: No autorizado
 */

router.get('/', exerciseController.getExercises);
router.get('/:id', exerciseController.getExerciseById);
router.post('/', exerciseController.createExercise);

module.exports = router;
