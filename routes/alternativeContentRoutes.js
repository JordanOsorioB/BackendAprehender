const express = require("express");
const { createAlternativeContent, getAlternativeContents } = require("../controllers/alternativeContentController");

const router = express.Router();

router.post("/", createAlternativeContent); // Crear contenido tipo alternativa
router.get("/", getAlternativeContents);    // Obtener contenido tipo alternativa

module.exports = router;
