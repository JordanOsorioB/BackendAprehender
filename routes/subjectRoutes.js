const express = require("express");
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const {
  getSubjectUnitBySubjectAndUnit,
} = require("../controllers/subjectUnitController");

const { createStudyMaterial, getStudyMaterialsBySubject } = require("../controllers/studyMaterialController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Endpoints para asignaturas
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     tags: [Subjects]
 *     summary: Obtener todas las asignaturas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asignaturas
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Subjects]
 *     summary: Crea una nueva asignatura
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
 *                 description: Nombre de la asignatura
 *               courseId:
 *                 type: string
 *                 description: ID del curso asociado (opcional)
 *     responses:
 *       200:
 *         description: Asignatura creada
 *       401:
 *         description: No autorizado
 *
 * /api/subjects/{id}:
 *   get:
 *     tags: [Subjects]
 *     summary: Obtener una asignatura por ID
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
 *         description: Asignatura encontrada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Asignatura no encontrada
 *   put:
 *     tags: [Subjects]
 *     summary: Actualiza una asignatura por ID
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
 *                 description: Nombre de la asignatura
 *     responses:
 *       200:
 *         description: Asignatura actualizada
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Subjects]
 *     summary: Elimina una asignatura por ID
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
 *         description: Asignatura eliminada
 *       401:
 *         description: No autorizado
 *
 * /api/subjects/{subjectId}/units/{unitId}:
 *   get:
 *     tags: [Subjects]
 *     summary: Obtener la relación SubjectUnit por subjectId y unitId
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación Subject-Unit encontrada
 *       404:
 *         description: No se encontró la relación
 *
 * /api/subjects/{subjectId}/study-materials:
 *   post:
 *     tags: [Subjects]
 *     summary: Crea un nuevo material de estudio para una asignatura
 *     description: Crea un material de estudio asociado a una asignatura específica.
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del material
 *               description:
 *                 type: string
 *                 description: Descripción del material (opcional)
 *               type:
 *                 type: string
 *                 description: Tipo de material (por ejemplo, PDF, VIDEO, LINK, etc)
 *               url:
 *                 type: string
 *                 description: URL del material
 *     responses:
 *       200:
 *         description: Material creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 material:
 *                   $ref: '#/components/schemas/StudyMaterial'
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error interno
 *   get:
 *     tags: [Subjects]
 *     summary: Obtiene todos los materiales de estudio de una asignatura
 *     description: Devuelve una lista de materiales de estudio asociados a la asignatura indicada.
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asignatura
 *     responses:
 *       200:
 *         description: Lista de materiales de estudio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudyMaterial'
 *       404:
 *         description: Asignatura no encontrada
 *       500:
 *         description: Error interno
 */

// Rutas de asignaturas
router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

// Ruta para relación subjectId y unitId (menos limpia pero efectiva)
router.get("/:subjectId/units/:unitId", getSubjectUnitBySubjectAndUnit);

router.post('/:subjectId/study-materials', (req, res, next) => {
  req.body.subjectId = req.params.subjectId;
  createStudyMaterial(req, res, next);
});

router.get('/:subjectId/study-materials', getStudyMaterialsBySubject);

module.exports = router;
