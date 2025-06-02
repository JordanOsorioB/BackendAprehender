const express = require("express");
const { 
  createAlternativeOption, 
  getAlternativeOptions,
  getAlternativeOptionById,
  updateAlternativeOption,
  deleteAlternativeOption 
} = require("../controllers/alternativeOptionController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AlternativeOptions
 *   description: Endpoints para opciones alternativas
 */
/**
 * @swagger
 * /api/alternative-options:
 *   get:
 *     tags: [AlternativeOptions]
 *     summary: Obtener todas las opciones alternativas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de opciones alternativas
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [AlternativeOptions]
 *     summary: Crea una nueva opción alternativa
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - isCorrect
 *               - exerciseContentId
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto de la opción
 *               isCorrect:
 *                 type: boolean
 *                 description: Indica si la opción es correcta
 *               exerciseContentId:
 *                 type: integer
 *                 description: ID del contenido de ejercicio al que pertenece
 *     responses:
 *       200:
 *         description: Opción alternativa creada
 *       401:
 *         description: No autorizado
 *
 * /api/alternative-options/{id}:
 *   get:
 *     tags: [AlternativeOptions]
 *     summary: Obtener una opción alternativa por ID
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
 *         description: Opción alternativa encontrada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Opción alternativa no encontrada
 *   put:
 *     tags: [AlternativeOptions]
 *     summary: Actualiza una opción alternativa por ID
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
 *               text:
 *                 type: string
 *                 description: Texto de la opción
 *     responses:
 *       200:
 *         description: Opción alternativa actualizada
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [AlternativeOptions]
 *     summary: Elimina una opción alternativa por ID
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
 *         description: Opción alternativa eliminada
 *       401:
 *         description: No autorizado
 */
router.get("/", getAlternativeOptions);    // Obtener todas las opciones
router.get("/:id", getAlternativeOptionById); // Obtener opción por ID
router.post("/", createAlternativeOption); // Crear opción
router.put("/:id", updateAlternativeOption); // Actualizar opción
router.delete("/:id", deleteAlternativeOption); // Eliminar opción

module.exports = router;
