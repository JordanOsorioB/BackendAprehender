const express = require("express");
const { createLevel, getLevels } = require("../controllers/levelController");

const router = express.Router();

router.post("/", createLevel); // Crear nuevo nivel
router.get("/", getLevels);    // Obtener todos los niveles

module.exports = router;
