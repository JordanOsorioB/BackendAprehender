const express = require("express");
const { getSessionLogs } = require("../controllers/sessionLogController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SessionLogs
 *   description: Endpoints para logs de sesión
 */

/**
 * @swagger
 * /api/session-logs:
 *   get:
 *     tags: [SessionLogs]
 *     summary: Obtener todos los logs de sesión
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs de sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SessionLog'
 *       401:
 *         description: No autorizado
 */

router.get("/", getSessionLogs);

module.exports = router;
