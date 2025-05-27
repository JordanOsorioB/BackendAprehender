const express = require("express");
const {
  getSubjects,
  createSubject,
} = require("../controllers/subjectController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Endpoints para asignaturas
 */
/**
 * @swagger
 * /subjects:
 *   get:
 *     tags: [Subjects]
 *     summary: Obtiene todas las asignaturas
 *     responses:
 *       200:
 *         description: Lista de asignaturas
 *   post:
 *     tags: [Subjects]
 *     summary: Crea una nueva asignatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Asignatura creada
 */

router.get("/", getSubjects);
router.post("/", createSubject);

module.exports = router;
