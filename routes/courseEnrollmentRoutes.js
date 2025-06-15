const express = require("express");
const router = express.Router();
const {
  getCourseEnrollments,
  getCourseEnrollmentById,
  createCourseEnrollment,
  updateCourseEnrollment,
  deleteCourseEnrollment
} = require("../controllers/courseEnrollmentController");

// Ruta para obtener todas las inscripciones
router.get("/", getCourseEnrollments);

// Ruta para obtener una inscripción por ID
router.get("/:id", getCourseEnrollmentById);

// Ruta para crear una inscripción
router.post("/", createCourseEnrollment);

// Ruta para actualizar una inscripción
router.put("/:id", updateCourseEnrollment);

// Ruta para eliminar una inscripción
router.delete("/:id", deleteCourseEnrollment);

module.exports = router;