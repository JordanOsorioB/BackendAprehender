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
 *             required:
 *               - name
 *               - subjectId
 *               - schoolId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del profesor
 *               subjectId:
 *                 type: string
 *                 description: ID de la materia asignada al profesor
 *               schoolId:
 *                 type: string
 *                 description: ID de la escuela a la que pertenece el profesor
 *     responses:
 *       200:
 *         description: Profesor creado exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al crear el profesor
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
