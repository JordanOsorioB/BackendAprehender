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
 * /teachers:
 *   get:
 *     tags: [Teachers]
 *     summary: Obtiene todos los profesores
 *     responses:
 *       200:
 *         description: Lista de profesores
 *   post:
 *     tags: [Teachers]
 *     summary: Crea un nuevo profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profesor creado
 * /teachers/{id}:
 *   get:
 *     tags: [Teachers]
 *     summary: Obtiene un profesor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profesor encontrado
 *   delete:
 *     tags: [Teachers]
 *     summary: Elimina un profesor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profesor eliminado
 */

router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);

module.exports = router;
