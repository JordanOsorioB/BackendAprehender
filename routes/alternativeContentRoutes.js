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
 * /alternative-contents:
 *   get:
 *     tags: [AlternativeContents]
 *     summary: Obtiene todos los contenidos de alternativas
 *     responses:
 *       200:
 *         description: Lista de contenidos de alternativas
 *   post:
 *     tags: [AlternativeContents]
 *     summary: Crea un nuevo contenido de alternativas
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
 * /alternative-contents/{id}:
 *   get:
 *     tags: [AlternativeContents]
 *     summary: Obtiene un contenido de alternativas por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenido de alternativas encontrado
 *   put:
 *     tags: [AlternativeContents]
 *     summary: Actualiza un contenido de alternativas por ID
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
 *   delete:
 *     tags: [AlternativeContents]
 *     summary: Elimina un contenido de alternativas por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contenido de alternativas eliminado
 */
router.get("/", getAlternativeContents);    // Obtener todos los contenidos
router.get("/:id", getAlternativeContentById); // Obtener contenido por ID
router.post("/", createAlternativeContent); // Crear contenido
router.put("/:id", updateAlternativeContent); // Actualizar contenido
router.delete("/:id", deleteAlternativeContent); // Eliminar contenido

module.exports = router;
