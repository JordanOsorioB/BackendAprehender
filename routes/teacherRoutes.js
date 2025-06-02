const express = require("express");
const {
  getTeachers,
  createTeacher,
  getTeacherById,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Endpoints para profesores
 */
/**
 * @swagger
 * /api/teachers:
 *   get:
 *     tags: [Teachers]
 *     summary: Obtener todos los profesores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profesores
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Teachers]
 *     summary: Crea un nuevo profesor
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
 *                 description: Nombre del profesor
 *     responses:
 *       200:
 *         description: Profesor creado
 *       401:
 *         description: No autorizado
 *
 * /api/teachers/{id}:
 *   get:
 *     tags: [Teachers]
 *     summary: Obtener un profesor por ID
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
 *         description: Profesor encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Profesor no encontrado
 *   put:
 *     tags: [Teachers]
 *     summary: Actualiza un profesor por ID
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
 *                 description: Nombre del profesor
 *     responses:
 *       200:
 *         description: Profesor actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Teachers]
 *     summary: Elimina un profesor por ID
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
 *         description: Profesor eliminado
 *       401:
 *         description: No autorizado
 */

router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);

module.exports = router;
