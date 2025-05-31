const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Endpoints para estudiantes
 */
/**
 * @swagger
 * /students:
 *   get:
 *     tags: [Students]
 *     summary: Obtiene todos los estudiantes
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *   post:
 *     tags: [Students]
 *     summary: Crea un nuevo estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - level
 *               - experience
 *             properties:
 *               nombre:
 *                 type: string
 *               level:
 *                 type: integer
 *               experience:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estudiante creado
 * /students/{id}:
 *   get:
 *     tags: [Students]
 *     summary: Obtiene un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *   put:
 *     tags: [Students]
 *     summary: Actualiza un estudiante por ID
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
 *               nombre:
 *                 type: string
 *               level:
 *                 type: integer
 *               experience:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *   delete:
 *     tags: [Students]
 *     summary: Elimina un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 * /students/{id}/courses:
 *   get:
 *     tags: [Students]
 *     summary: Obtiene los cursos de un estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de cursos del estudiante
 * /students/{id}/full:
 *   get:
 *     tags: [Students]
 *     summary: Obtiene toda la información anidada del estudiante (mock style)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información anidada del estudiante
 */

router.get('/', studentController.getStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id/courses', studentController.getStudentCourses);
router.get('/:id/full', studentController.getStudentFullData);

module.exports = router;
