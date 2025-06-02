const express = require("express");
const { createPairingContent, getPairingContents } = require("../controllers/pairingContentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PairingContents
 *   description: Endpoints para contenidos de emparejamiento
 */
/**
 * @swagger
 * /api/pairing-contents:
 *   get:
 *     tags: [PairingContents]
 *     summary: Obtener todos los contenidos de emparejamiento
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contenidos de emparejamiento
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [PairingContents]
 *     summary: Crea un nuevo contenido de emparejamiento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del emparejamiento
 *     responses:
 *       200:
 *         description: Contenido de emparejamiento creado
 *       401:
 *         description: No autorizado
 *
 * /api/pairing-contents/{id}:
 *   get:
 *     tags: [PairingContents]
 *     summary: Obtener un contenido de emparejamiento por ID
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
 *         description: Contenido de emparejamiento encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Contenido de emparejamiento no encontrado
 *   put:
 *     tags: [PairingContents]
 *     summary: Actualiza un contenido de emparejamiento por ID
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
 *               content:
 *                 type: string
 *                 description: Contenido del emparejamiento
 *     responses:
 *       200:
 *         description: Contenido de emparejamiento actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [PairingContents]
 *     summary: Elimina un contenido de emparejamiento por ID
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
 *         description: Contenido de emparejamiento eliminado
 *       401:
 *         description: No autorizado
 */
router.post("/", createPairingContent); // Crear contenido tipo términos pareados
router.get("/", getPairingContents);    // Obtener contenidos tipo términos pareados

module.exports = router;
