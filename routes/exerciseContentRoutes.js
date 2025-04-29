const express = require("express");
const { createExerciseContent, getExerciseContents } = require("../controllers/exerciseContentController");

const router = express.Router();

router.post("/", createExerciseContent); // Crear contenido para ejercicio
router.get("/", getExerciseContents);    // Obtener contenidos

module.exports = router;
