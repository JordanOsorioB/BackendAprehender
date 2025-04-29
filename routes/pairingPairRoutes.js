const express = require("express");
const { createPairingPair, getPairingPairs } = require("../controllers/pairingPairController");

const router = express.Router();

router.post("/", createPairingPair); // Crear par de términos
router.get("/", getPairingPairs);    // Obtener pares de términos

module.exports = router;
