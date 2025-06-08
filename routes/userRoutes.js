const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para usuarios
 */
/**
 *  @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *   post:
 *     tags: [Users]
 *     summary: Crea un nuevo usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               schoolId:
 *                 type: string
 *                 description: ID de la escuela (opcional)
 *               role:
 *                 type: string
 *                 enum: [ADMIN, TEACHER, STUDENT, SUPERADMIN]
 *                 description: Rol del usuario
 *               studentId:
 *                 type: string
 *                 description: ID del estudiante (opcional)
 *     responses:
 *       200:
 *         description: Usuario creado
 *       401:
 *         description: No autorizado
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener un usuario por ID
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
 *         description: Usuario encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     tags: [Users]
 *     summary: Actualiza un usuario por ID
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
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               schoolId:
 *                 type: string
 *                 description: ID de la escuela (opcional)
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       401:
 *         description: No autorizado
 *   delete:
 *     tags: [Users]
 *     summary: Elimina un usuario por ID
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
 *         description: Usuario eliminado
 *       401:
 *         description: No autorizado
 */

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
