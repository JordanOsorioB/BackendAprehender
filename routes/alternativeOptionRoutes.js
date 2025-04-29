const express = require("express");
const { createAlternativeOption, getAlternativeOptions } = require("../controllers/alternativeOptionController");

const router = express.Router();

router.post("/", createAlternativeOption); // Crear opción de alternativa
router.get("/", getAlternativeOptions);    // Obtener todas las opciones

module.exports = router;
