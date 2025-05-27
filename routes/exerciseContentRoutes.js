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
 * /exercise-contents:
 *   get:
 *     tags: [ExerciseContents]
 *     summary: Obtiene todos los contenidos de ejercicios
 *     responses:
 *       200:
 *         description: Lista de contenidos de ejercicios
 *   post:
 *     tags: [ExerciseContents]
 *     summary: Crea un nuevo contenido de ejercicios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enunciado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenido de ejercicios creado
 */
router.post("/", createExerciseContent); // Crear contenido para ejercicio
router.get("/", getExerciseContents);    // Obtener contenidos

module.exports = router;
