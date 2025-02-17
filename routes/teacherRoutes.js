const express = require("express");
const {
  getTeachers,
  createTeacher,
  getTeacherById,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);

module.exports = router;
