const express = require("express");
const { createExerciseState, getExerciseStates } = require("../controllers/exerciseStateController");

const router = express.Router();

router.post("/", createExerciseState); // Crear nuevo estado de ejercicio
router.get("/", getExerciseStates);   // Obtener todos los estados

module.exports = router;
