const express = require("express");
const { createPairingContent, getPairingContents } = require("../controllers/pairingContentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PairingContents
 *   description: Endpoints para contenidos de términos pareados
 */
/**
 * @swagger
 * /pairing-contents:
 *   get:
 *     tags: [PairingContents]
 *     summary: Obtiene todos los contenidos de términos pareados
 *     responses:
 *       200:
 *         description: Lista de contenidos de términos pareados
 *   post:
 *     tags: [PairingContents]
 *     summary: Crea un nuevo contenido de términos pareados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instruccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenido de términos pareados creado
 */
router.post("/", createPairingContent); // Crear contenido tipo términos pareados
router.get("/", getPairingContents);    // Obtener contenidos tipo términos pareados

module.exports = router;
