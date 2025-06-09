const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const studentSubjectProgressController = require('../controllers/studentSubjectProgressController');
const { getStudyMaterialsForStudent } = require('../controllers/studyMaterialController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
 * /api/students/student-subject-progress:
 *   post:
 *     tags: [Students]
 *     summary: Asigna una asignatura a un estudiante y crea los estados de todos los ejercicios de esa asignatura para el estudiante.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: ID del estudiante
 *               subjectId:
 *                 type: string
 *                 description: ID de la asignatura
 *     responses:
 *       200:
 *         description: Progreso creado y estados de ejercicios inicializados
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error interno
 * /api/students/{id}/study-materials:
 *   get:
 *     tags: [Students]
 *     summary: Obtiene todos los materiales de estudio de las asignaturas asignadas al estudiante.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Lista de materiales agrupados por asignatura
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno
 * /api/students/add-experience:
 *   post:
 *     tags: [Students]
 *     summary: Suma experiencia a un estudiante, actualiza el nivel y otorga recompensas si corresponde.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: ID del estudiante
 *               experienciaGanada:
 *                 type: integer
 *                 description: Experiencia ganada en el ejercicio
 *     responses:
 *       200:
 *         description: Experiencia sumada, nivel actualizado y recompensa otorgada si corresponde
 *       400:
 *         description: Faltan datos obligatorios
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno
 * @swagger
 * /api/students/upload-profile-picture:
 *   post:
 *     tags: [Students]
 *     summary: Sube una foto de perfil para un estudiante y actualiza su URL en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil a subir
 *               studentId:
 *                 type: string
 *                 description: ID del estudiante
 *     responses:
 *       200:
 *         description: URL pública de la imagen subida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL pública de la imagen
 *       400:
 *         description: Faltan datos obligatorios o archivo no enviado
 *       500:
 *         description: Error interno o error al subir la imagen
 */

router.get('/', studentController.getStudents);
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/:id/courses', studentController.getStudentCourses);
router.get('/:id/full', studentController.getStudentFullData);
router.post('/student-subject-progress', studentSubjectProgressController.createStudentSubjectProgress);
router.get('/:id/study-materials', getStudyMaterialsForStudent);
router.post('/add-experience', studentController.addExperienceAndLevel);
router.post('/upload-profile-picture', upload.single('file'), studentController.uploadProfilePicture);

module.exports = router;
