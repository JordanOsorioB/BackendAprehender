const express = require("express");
const { createPairingPair, getPairingPairs } = require("../controllers/pairingPairController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PairingPairs
 *   description: Endpoints para pares de emparejamiento
 */
/**
 * @swagger
 * /api/pairing-pairs:
 *   get:
 *     tags: [PairingPairs]
 *     summary: Obtener todos los pares de emparejamiento
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pares de emparejamiento
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [PairingPairs]
 *     summary: Crea un nuevo par de emparejamiento
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
 *                 description: Nombre del par
 *     responses:
 *       200:
 *         description: Par de emparejamiento creado
 *       401:
 *         description: No autorizado
 *
 * /api/pairing-pairs/{id}:
 *   get:
 *     tags: [PairingPairs]
 *     summary: Obtener un par de emparejamiento por ID
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
 *         description: Par de emparejamiento encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Par de emparejamiento no encontrado
 *   put:
 *     tags: [PairingPairs]
 *     summary: Actualiza un par de emparejamiento por ID
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
 *                 description: Nombre del par
 *     responses:
 *       200:
 *         description: Par de emparejamiento actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [PairingPairs]
 *     summary: Elimina un par de emparejamiento por ID
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
 *         description: Par de emparejamiento eliminado
 *       401:
 *         description: No autorizado
 */
router.post("/", createPairingPair); // Crear par de términos
router.get("/", getPairingPairs);    // Obtener pares de términos

module.exports = router;
