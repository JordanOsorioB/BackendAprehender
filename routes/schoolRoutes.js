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
 * /api/schools:
 *   get:
 *     tags: [Schools]
 *     summary: Obtener todas las escuelas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de escuelas
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Schools]
 *     summary: Crea una nueva escuela
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la escuela
 *     responses:
 *       200:
 *         description: Escuela creada
 *       401:
 *         description: No autorizado
 *
 * /api/schools/{id}:
 *   get:
 *     tags: [Schools]
 *     summary: Obtener una escuela por ID
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
 *         description: Escuela encontrada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Escuela no encontrada
 *   put:
 *     tags: [Schools]
 *     summary: Actualiza una escuela por ID
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
 *               name:
 *                 type: string
 *                 description: Nombre de la escuela
 *     responses:
 *       200:
 *         description: Escuela actualizada
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Schools]
 *     summary: Elimina una escuela por ID
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
 *         description: Escuela eliminada
 *       401:
 *         description: No autorizado
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
