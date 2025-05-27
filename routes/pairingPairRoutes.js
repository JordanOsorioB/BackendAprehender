const express = require("express");
const { createPairingPair, getPairingPairs } = require("../controllers/pairingPairController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PairingPairs
 *   description: Endpoints para pares de términos pareados
 */
/**
 * @swagger
 * /pairing-pairs:
 *   get:
 *     tags: [PairingPairs]
 *     summary: Obtiene todos los pares de términos pareados
 *     responses:
 *       200:
 *         description: Lista de pares de términos pareados
 *   post:
 *     tags: [PairingPairs]
 *     summary: Crea un nuevo par de términos pareados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               termino:
 *                 type: string
 *               definicion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Par de términos pareados creado
 */
router.post("/", createPairingPair); // Crear par de términos
router.get("/", getPairingPairs);    // Obtener pares de términos

module.exports = router;
