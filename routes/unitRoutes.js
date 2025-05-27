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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               order:
 *                 type: integer
 *               subjectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Unidad creada
 */
router.post("/", createUnit); // Crear nueva unidad
router.get("/", getUnits);    // Obtener todas las unidades

module.exports = router;
