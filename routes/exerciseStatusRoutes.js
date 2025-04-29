const express = require("express");
const { createExerciseStatus, getExerciseStatuses } = require("../controllers/exerciseStatusController");

const router = express.Router();

router.post("/", createExerciseStatus); // Crear nuevo estado de ejercicio
router.get("/", getExerciseStatuses);   // Obtener todos los estados

module.exports = router;
