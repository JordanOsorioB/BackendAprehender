const express = require("express");
const {
  createUnit,
  getUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
  getUnitsBySubject,
} = require("../controllers/unitController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: Endpoints para unidades
 */

/**
 * @swagger
 * /api/units:
 *   get:
 *     tags: [Units]
 *     summary: Obtener todas las unidades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de unidades
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Units]
 *     summary: Crea una nueva unidad
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - order
 *               - courseId
 *               - subjectId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la unidad
 *               description:
 *                 type: string
 *                 description: Descripción de la unidad
 *               order:
 *                 type: integer
 *                 description: Orden numérico de la unidad
 *               courseId:
 *                 type: string
 *                 description: ID del curso (string UUID)
 *               subjectId:
 *                 type: string
 *                 description: ID de la asignatura (string UUID)
 *     responses:
 *       201:
 *         description: Unidad creada correctamente
 *       400:
 *         description: Datos faltantes o incorrectos
 *       401:
 *         description: No autorizado
 *
 * /api/units/{id}:
 *   get:
 *     tags: [Units]
 *     summary: Obtener una unidad por ID
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
 *         description: Unidad encontrada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Unidad no encontrada
 *   put:
 *     tags: [Units]
 *     summary: Actualiza una unidad por ID
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Unidad actualizada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Units]
 *     summary: Elimina una unidad por ID
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
 *         description: Unidad eliminada
 *       401:
 *         description: No autorizado
 *
 * /api/units/subjects/{subjectId}/units:
 *   get:
 *     tags: [Units]
 *     summary: Obtener unidades por ID de asignatura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de unidades relacionadas con una asignatura
 *       401:
 *         description: No autorizado
 */

// Rutas básicas
router.post("/", createUnit); // Crear nueva unidad
router.get("/", getUnits); // Obtener todas las unidades
router.get("/subjects/:subjectId/units", getUnitsBySubject); // Unidades por asignatura
router.get("/:id", getUnitById); // Obtener unidad por ID
router.put("/:id", updateUnit); // Actualizar unidad
router.delete("/:id", deleteUnit); // Eliminar unidad

module.exports = router;
