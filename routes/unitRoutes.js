const express = require("express");
const { createUnit, getUnits } = require("../controllers/unitController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: Endpoints para unidades
 */
/**
 * @swagger
 * /units:
 *   get:
 *     tags: [Units]
 *     summary: Obtiene todas las unidades
 *     responses:
 *       200:
 *         description: Lista de unidades
 *   post:
 *     tags: [Units]
 *     summary: Crea una nueva unidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - order
 *               - subjectId
 *               - unitId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la unidad
 *               description:
 *                 type: string
 *                 description: Descripción de la unidad
 *               order:
 *                 type: integer
 *                 description: Orden de la unidad
 *               subjectId:
 *                 type: string
 *                 description: ID de la asignatura
 *               unitId:
 *                 type: integer
 *                 description: ID de la unidad principal (si aplica)
 *     responses:
 *       200:
 *         description: Unidad creada
 */
router.post("/", createUnit); // Crear nueva unidad
router.get("/", getUnits);    // Obtener todas las unidades

module.exports = router;
