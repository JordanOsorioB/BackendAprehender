const express = require("express");
const { createDevelopmentContent, getDevelopmentContents } = require("../controllers/developmentContentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DevelopmentContents
 *   description: Endpoints para contenidos de desarrollo
 */
/**
 * @swagger
 * /api/development-contents:
 *   get:
 *     tags: [DevelopmentContents]
 *     summary: Obtener todos los contenidos de desarrollo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contenidos de desarrollo
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [DevelopmentContents]
 *     summary: Crea un nuevo contenido de desarrollo
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
 *                 description: Contenido de desarrollo
 *     responses:
 *       200:
 *         description: Contenido de desarrollo creado
 *       401:
 *         description: No autorizado
 *
 * /api/development-contents/{id}:
 *   get:
 *     tags: [DevelopmentContents]
 *     summary: Obtener un contenido de desarrollo por ID
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
 *         description: Contenido de desarrollo encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Contenido de desarrollo no encontrado
 *   put:
 *     tags: [DevelopmentContents]
 *     summary: Actualiza un contenido de desarrollo por ID
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
 *                 description: Contenido de desarrollo
 *     responses:
 *       200:
 *         description: Contenido de desarrollo actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [DevelopmentContents]
 *     summary: Elimina un contenido de desarrollo por ID
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
 *         description: Contenido de desarrollo eliminado
 *       401:
 *         description: No autorizado
 */
router.post("/", createDevelopmentContent); // Crear contenido de desarrollo
router.get("/", getDevelopmentContents);    // Obtener todos los contenidos

module.exports = router;
