const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Endpoints para cursos
 */
/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     summary: Obtener todos los cursos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Courses]
 *     summary: Crea un nuevo curso
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del curso
 *     responses:
 *       200:
 *         description: Curso creado
 *       401:
 *         description: No autorizado
 *
 * /api/courses/{id}:
 *   get:
 *     tags: [Courses]
 *     summary: Obtener un curso por ID
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
 *         description: Curso encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 *   put:
 *     tags: [Courses]
 *     summary: Actualiza un curso por ID
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
 *               name:
 *                 type: string
 *                 description: Nombre del curso
 *     responses:
 *       200:
 *         description: Curso actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Courses]
 *     summary: Elimina un curso por ID
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
 *         description: Curso eliminado
 *       401:
 *         description: No autorizado
 */

router.post("/", createCourse); // Agregamos la ruta POST para registrar cursos
router.get("/", getCourses);

module.exports = router;
