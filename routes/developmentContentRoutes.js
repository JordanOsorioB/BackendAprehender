const express = require("express");
const { createDevelopmentContent, getDevelopmentContents } = require("../controllers/developmentContentController");

const router = express.Router();

router.post("/", createDevelopmentContent); // Crear contenido de desarrollo
router.get("/", getDevelopmentContents);    // Obtener todos los contenidos

module.exports = router;
