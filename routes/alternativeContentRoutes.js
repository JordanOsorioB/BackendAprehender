const express = require("express");
const { 
  createAlternativeContent, 
  getAlternativeContents,
  getAlternativeContentById,
  updateAlternativeContent,
  deleteAlternativeContent 
} = require("../controllers/alternativeContentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AlternativeContents
 *   description: Endpoints para contenidos de alternativas
 */
/**
 * @swagger
 * /api/alternative-contents:
 *   get:
 *     summary: Obtiene todos los contenidos de alternativas
 *     tags: [AlternativeContents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contenidos de alternativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crea un nuevo contenido de alternativas
 *     tags: [AlternativeContents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enunciado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenido de alternativas creado
 *       401:
 *         description: No autorizado
 *
 * /api/alternative-contents/{id}:
 *   get:
 *     summary: Obtiene un contenido de alternativas por ID
 *     tags: [AlternativeContents]
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
 *         description: Contenido de alternativas encontrado
 *       401:
 *         description: No autorizado
 *   put:
 *     summary: Actualiza un contenido de alternativas por ID
 *     tags: [AlternativeContents]
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
 *               enunciado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenido de alternativas actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     summary: Elimina un contenido de alternativas por ID
 *     tags: [AlternativeContents]
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
 *         description: Contenido de alternativas eliminado
 *       401:
 *         description: No autorizado
 */
router.get("/", getAlternativeContents);    // Obtener todos los contenidos
router.get("/:id", getAlternativeContentById); // Obtener contenido por ID
router.post("/", createAlternativeContent); // Crear contenido
router.put("/:id", updateAlternativeContent); // Actualizar contenido
router.delete("/:id", deleteAlternativeContent); // Eliminar contenido

module.exports = router;
