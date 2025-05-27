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
 * /development-contents:
 *   get:
 *     tags: [DevelopmentContents]
 *     summary: Obtiene todos los contenidos de desarrollo
 *     responses:
 *       200:
 *         description: Lista de contenidos de desarrollo
 *   post:
 *     tags: [DevelopmentContents]
 *     summary: Crea un nuevo contenido de desarrollo
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
 *         description: Contenido de desarrollo creado
 */
router.post("/", createDevelopmentContent); // Crear contenido de desarrollo
router.get("/", getDevelopmentContents);    // Obtener todos los contenidos

module.exports = router;
