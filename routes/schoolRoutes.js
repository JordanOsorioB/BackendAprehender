const express = require("express");
const {
  getSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
  getSchoolByCode,
} = require("../controllers/schoolController");

const router = express.Router();

router.get("/", getSchools);
router.post("/", createSchool);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);
router.get("/schools/code/:code", getSchoolByCode);

module.exports = router;
