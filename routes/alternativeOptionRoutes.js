const express = require("express");
const { 
  createAlternativeOption, 
  getAlternativeOptions,
  getAlternativeOptionById,
  updateAlternativeOption,
  deleteAlternativeOption 
} = require("../controllers/alternativeOptionController");

const router = express.Router();

router.get("/", getAlternativeOptions);    // Obtener todas las opciones
router.get("/:id", getAlternativeOptionById); // Obtener opción por ID
router.post("/", createAlternativeOption); // Crear opción
router.put("/:id", updateAlternativeOption); // Actualizar opción
router.delete("/:id", deleteAlternativeOption); // Eliminar opción

module.exports = router;
