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
 * /alternative-options:
 *   get:
 *     tags: [AlternativeOptions]
 *     summary: Obtiene todas las opciones alternativas
 *     responses:
 *       200:
 *         description: Lista de opciones alternativas
 *   post:
 *     tags: [AlternativeOptions]
 *     summary: Crea una nueva opción alternativa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *               esCorrecta:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Opción alternativa creada
 * /alternative-options/{id}:
 *   get:
 *     tags: [AlternativeOptions]
 *     summary: Obtiene una opción alternativa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Opción alternativa encontrada
 *   put:
 *     tags: [AlternativeOptions]
 *     summary: Actualiza una opción alternativa por ID
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
 *               texto:
 *                 type: string
 *               esCorrecta:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Opción alternativa actualizada
 *   delete:
 *     tags: [AlternativeOptions]
 *     summary: Elimina una opción alternativa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Opción alternativa eliminada
 */
router.get("/", getAlternativeOptions);    // Obtener todas las opciones
router.get("/:id", getAlternativeOptionById); // Obtener opción por ID
router.post("/", createAlternativeOption); // Crear opción
router.put("/:id", updateAlternativeOption); // Actualizar opción
router.delete("/:id", deleteAlternativeOption); // Eliminar opción

module.exports = router;
