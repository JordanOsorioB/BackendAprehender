const express = require('express');
const router = express.Router();
const profilePictureGalleryController = require('../controllers/profilePictureGalleryController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: ProfilePictureGallery
 *   description: Galería de imágenes de perfil públicas
 */
/**
 * @swagger
 * /api/profile-pictures:
 *   get:
 *     tags: [ProfilePictureGallery]
 *     summary: Obtener todas las imágenes de la galería
 *     responses:
 *       200:
 *         description: Lista de imágenes de perfil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   url:
 *                     type: string
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *   post:
 *     tags: [ProfilePictureGallery]
 *     summary: Agregar una nueva imagen a la galería
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen a subir
 *               name:
 *                 type: string
 *                 description: Nombre o descripción opcional
 *     responses:
 *       201:
 *         description: Imagen agregada
 *       400:
 *         description: Faltan datos
 *       500:
 *         description: Error interno
 * /api/profile-pictures/{id}:
 *   delete:
 *     tags: [ProfilePictureGallery]
 *     summary: Eliminar una imagen de la galería
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *       500:
 *         description: Error interno
 */

// Obtener todas las imágenes de la galería
router.get('/', profilePictureGalleryController.getAllProfilePictures);

// Agregar una nueva imagen (subida de archivo)
router.post('/', upload.single('file'), profilePictureGalleryController.addProfilePicture);

// Eliminar una imagen
router.delete('/:id', profilePictureGalleryController.deleteProfilePicture);

module.exports = router; 