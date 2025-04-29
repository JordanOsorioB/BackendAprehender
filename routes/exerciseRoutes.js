const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/unit/:unitId', exerciseController.getExercisesByUnit);
router.post('/', exerciseController.createExercise);

module.exports = router;
