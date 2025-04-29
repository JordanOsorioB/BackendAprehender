const express = require("express");
const { createPairingContent, getPairingContents } = require("../controllers/pairingContentController");

const router = express.Router();

router.post("/", createPairingContent); // Crear contenido tipo términos pareados
router.get("/", getPairingContents);    // Obtener contenidos tipo términos pareados

module.exports = router;
