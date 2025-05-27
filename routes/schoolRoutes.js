const express = require("express");
const {
  getSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
  getSchoolByCode,
} = require("../controllers/schoolController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: Endpoints para escuelas
 */
/**
 * @swagger
 * /schools:
 *   get:
 *     tags: [Schools]
 *     summary: Obtiene todas las escuelas
 *     responses:
 *       200:
 *         description: Lista de escuelas
 *   post:
 *     tags: [Schools]
 *     summary: Crea una nueva escuela
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Escuela creada
 * /schools/{id}:
 *   get:
 *     tags: [Schools]
 *     summary: Obtiene una escuela por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Escuela encontrada
 *   put:
 *     tags: [Schools]
 *     summary: Actualiza una escuela por ID
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
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Escuela actualizada
 *   delete:
 *     tags: [Schools]
 *     summary: Elimina una escuela por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Escuela eliminada
 * /schools/code/{code}:
 *   get:
 *     tags: [Schools]
 *     summary: Obtiene una escuela por código
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Escuela encontrada por código
 */

router.get("/", getSchools);
router.post("/", createSchool);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);
router.get("/schools/code/:code", getSchoolByCode);

module.exports = router;
