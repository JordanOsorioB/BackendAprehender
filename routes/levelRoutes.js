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
 *             required:
 *               - name
 *               - order
 *               - unitId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del nivel
 *               description:
 *                 type: string
 *                 description: Descripción del nivel
 *               order:
 *                 type: integer
 *                 description: Orden del nivel
 *               unitId:
 *                 type: integer
 *                 description: ID de la unidad a la que pertenece
 *     responses:
 *       200:
 *         description: Nivel creado
 */

router.post("/", createLevel); // Crear nuevo nivel
router.get("/", getLevels);    // Obtener todos los niveles

module.exports = router;
