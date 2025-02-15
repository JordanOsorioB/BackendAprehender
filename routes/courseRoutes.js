const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");

const router = express.Router();

router.post("/", createCourse); // Agregamos la ruta POST para registrar cursos
router.get("/", getCourses);

module.exports = router;
