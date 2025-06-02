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
 * /api/students:
 *   get:
 *     tags: [Students]
 *     summary: Obtener todos los estudiantes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Students]
 *     summary: Crea un nuevo estudiante
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del estudiante
 *     responses:
 *       200:
 *         description: Estudiante creado
 *       401:
 *         description: No autorizado
 *
 * /api/students/{id}:
 *   get:
 *     tags: [Students]
 *     summary: Obtener un estudiante por ID
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
 *         description: Estudiante encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Estudiante no encontrado
 *   put:
 *     tags: [Students]
 *     summary: Actualiza un estudiante por ID
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
 *               nombre:
 *                 type: string
 *               level:
 *                 type: integer
 *               experience:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Students]
 *     summary: Elimina un estudiante por ID
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
 *         description: Estudiante eliminado
 *       401:
 *         description: No autorizado
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
