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
 * /levels:
 *   get:
 *     tags: [Levels]
 *     summary: Obtiene todos los niveles
 *     responses:
 *       200:
 *         description: Lista de niveles
 *   post:
 *     tags: [Levels]
 *     summary: Crea un nuevo nivel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               experiencia:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Nivel creado
 */

router.post("/", createLevel); // Crear nuevo nivel
router.get("/", getLevels);    // Obtener todos los niveles

module.exports = router;
