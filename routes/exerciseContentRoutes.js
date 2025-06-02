const express = require("express");
const { createExerciseContent, getExerciseContents } = require("../controllers/exerciseContentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExerciseContents
 *   description: Endpoints para contenidos de ejercicios
 */
/**
 * @swagger
 * /api/exercise-contents:
 *   get:
 *     tags: [ExerciseContents]
 *     summary: Obtener todos los contenidos de ejercicios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contenidos de ejercicios
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [ExerciseContents]
 *     summary: Crea un nuevo contenido de ejercicio
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del ejercicio
 *     responses:
 *       200:
 *         description: Contenido de ejercicio creado
 *       401:
 *         description: No autorizado
 *
 * /api/exercise-contents/{id}:
 *   get:
 *     tags: [ExerciseContents]
 *     summary: Obtener un contenido de ejercicio por ID
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
 *         description: Contenido de ejercicio encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Contenido de ejercicio no encontrado
 *   put:
 *     tags: [ExerciseContents]
 *     summary: Actualiza un contenido de ejercicio por ID
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
 *               content:
 *                 type: string
 *                 description: Contenido del ejercicio
 *     responses:
 *       200:
 *         description: Contenido de ejercicio actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [ExerciseContents]
 *     summary: Elimina un contenido de ejercicio por ID
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
 *         description: Contenido de ejercicio eliminado
 *       401:
 *         description: No autorizado
 */
router.post("/", createExerciseContent); // Crear contenido para ejercicio
router.get("/", getExerciseContents);    // Obtener contenidos

module.exports = router;
