const express = require("express");
const { createUnit, getUnits } = require("../controllers/unitController");

const router = express.Router();

router.post("/", createUnit); // Crear nueva unidad
router.get("/", getUnits);    // Obtener todas las unidades

module.exports = router;
