const express = require("express");
const { createLevel, getLevels } = require("../controllers/levelController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Endpoints para niveles
 */
/**
 * @swagger
 * /api/levels:
 *   get:
 *     tags: [Levels]
 *     summary: Obtener todos los niveles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de niveles
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Levels]
 *     summary: Crea un nuevo nivel
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
 *                 description: Nombre del nivel
 *     responses:
 *       200:
 *         description: Nivel creado
 *       401:
 *         description: No autorizado
 *
 * /api/levels/{id}:
 *   get:
 *     tags: [Levels]
 *     summary: Obtener un nivel por ID
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
 *         description: Nivel encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Nivel no encontrado
 *   put:
 *     tags: [Levels]
 *     summary: Actualiza un nivel por ID
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
 *                 description: Nombre del nivel
 *     responses:
 *       200:
 *         description: Nivel actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Levels]
 *     summary: Elimina un nivel por ID
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
 *         description: Nivel eliminado
 *       401:
 *         description: No autorizado
 */

router.post("/", createLevel); // Crear nuevo nivel
router.get("/", getLevels);    // Obtener todos los niveles

module.exports = router;
