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
 */

// Rutas
router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);
// Ruta para obtener subjectUnit por subjectId y unitId
router.get(
  "/subject-units/by-subject/:subjectId/unit/:unitId",
  getSubjectUnitBySubjectAndUnit
);

module.exports = router;
