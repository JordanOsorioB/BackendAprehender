const express = require("express");
const router = express.Router();
const { getSessionLogs, createSessionLog, getSessionLogById, getSessionLogsByUserId, updateSessionLog, deleteSessionLog } = require("../controllers/sessionLogController");

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
 *     responses:
 *       200:
 *         description: Lista de logs de sesión
 */
/**
 * @swagger
 * /api/session-logs:
 *   post:
 *     tags: [SessionLogs]
 *     summary: Crear un nuevo log de sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               loginAt:
 *                 type: string
 *                 format: date-time
 *               logoutAt:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Log de sesión creado
 *       500:
 *         description: Error al crear log
 */
/**
 * @swagger
 * /api/session-logs/{id}:
 *   get:
 *     tags: [SessionLogs]
 *     summary: Obtener un log de sesión por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del log de sesión
 *     responses:
 *       200:
 *         description: Log de sesión encontrado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /api/session-logs/user/{userId}:
 *   get:
 *     tags: [SessionLogs]
 *     summary: Obtener todos los logs de sesión de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de logs de sesión del usuario
 */
/**
 * @swagger
 * /api/session-logs/{id}:
 *   put:
 *     tags: [SessionLogs]
 *     summary: Actualizar un log de sesión
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del log de sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loginAt:
 *                 type: string
 *                 format: date-time
 *               logoutAt:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Log actualizado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /api/session-logs/{id}:
 *   delete:
 *     tags: [SessionLogs]
 *     summary: Eliminar un log de sesión
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del log de sesión
 *     responses:
 *       200:
 *         description: Log eliminado
 *       404:
 *         description: No encontrado
 */

router.get("/", getSessionLogs);
router.post("/", createSessionLog);
router.get("/:id", getSessionLogById);
router.get("/user/:userId", getSessionLogsByUserId);
router.put("/:id", updateSessionLog);
router.delete("/:id", deleteSessionLog);

module.exports = router;
