const express = require("express");
const {
  getSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");

const router = express.Router();

router.get("/", getSchools);
router.post("/", createSchool);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);

module.exports = router;
