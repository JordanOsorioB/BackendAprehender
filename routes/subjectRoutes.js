const express = require("express");
const {
  getSubjects,
  createSubject,
} = require("../controllers/subjectController");

const router = express.Router();

router.get("/", getSubjects);
router.post("/", createSubject);

module.exports = router;
