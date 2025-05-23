const express = require("express");
const { 
  createAlternativeContent, 
  getAlternativeContents,
  getAlternativeContentById,
  updateAlternativeContent,
  deleteAlternativeContent 
} = require("../controllers/alternativeContentController");

const router = express.Router();

router.get("/", getAlternativeContents);    // Obtener todos los contenidos
router.get("/:id", getAlternativeContentById); // Obtener contenido por ID
router.post("/", createAlternativeContent); // Crear contenido
router.put("/:id", updateAlternativeContent); // Actualizar contenido
router.delete("/:id", deleteAlternativeContent); // Eliminar contenido

module.exports = router;
