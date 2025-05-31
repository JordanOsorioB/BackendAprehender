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
 * /courses:
 *   get:
 *     tags: [Courses]
 *     summary: Obtiene todos los cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *   post:
 *     tags: [Courses]
 *     summary: Crea un nuevo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - schoolId
 *               - teacherId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del curso
 *               schoolId:
 *                 type: string
 *                 description: ID de la escuela
 *               teacherId:
 *                 type: string
 *                 description: ID del profesor
 *     responses:
 *       200:
 *         description: Curso creado
 */

router.post("/", createCourse); // Agregamos la ruta POST para registrar cursos
router.get("/", getCourses);

module.exports = router;
