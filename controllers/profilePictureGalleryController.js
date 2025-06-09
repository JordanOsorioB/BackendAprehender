const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const supabase = require('../supabase/client');
const path = require('path');
const fs = require('fs');

// Obtener todas las imágenes de la galería
const getAllProfilePictures = async (req, res) => {
  try {
    const pictures = await prisma.profilePictureGallery.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(pictures);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo imágenes de perfil', details: error.message });
  }
};

// Agregar una nueva imagen a la galería (subida de archivo)
const addProfilePicture = async (req, res) => {
  try {
    const name = req.body.name;
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ningún archivo.' });
    }
    // Leer el archivo temporal
    const fileBuffer = fs.readFileSync(req.file.path);
    const ext = path.extname(req.file.originalname) || '.jpg';
    const filename = `gallery_${Date.now()}${ext}`;
    const filePath = `gallery/${filename}`;

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: true
      });
    // Borrar el archivo temporal
    fs.unlinkSync(req.file.path);
    if (error) {
      return res.status(500).json({ error: 'Error subiendo imagen a Supabase', details: error });
    }
    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const publicUrl = publicUrlData.publicUrl;
    // Guardar en la galería
    const picture = await prisma.profilePictureGallery.create({ data: { url: publicUrl, name } });
    res.status(201).json(picture);
  } catch (error) {
    res.status(500).json({ error: 'Error agregando imagen de perfil', details: error.message });
  }
};

// Eliminar una imagen de la galería
const deleteProfilePicture = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.profilePictureGallery.delete({ where: { id } });
    res.json({ message: 'Imagen eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando imagen de perfil', details: error.message });
  }
};

module.exports = {
  getAllProfilePictures,
  addProfilePicture,
  deleteProfilePicture,
}; 