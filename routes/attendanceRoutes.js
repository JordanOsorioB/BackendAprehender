const express = require("express");
const { getAttendances } = require("../controllers/attendanceController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attendances
 *   description: Endpoints para asistencias
 */

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     tags: [Attendances]
 *     summary: Obtener todas las asistencias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asistencias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 *       401:
 *         description: No autorizado
 */

router.get("/", getAttendances);

module.exports = router;
