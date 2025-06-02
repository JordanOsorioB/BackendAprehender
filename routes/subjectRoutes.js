const express = require("express");
const {
  getSubjects,
  createSubject,
} = require("../controllers/subjectController");

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

router.get("/", getSubjects);
router.post("/", createSubject);

module.exports = router;
