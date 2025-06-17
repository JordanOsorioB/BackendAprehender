const express = require('express');
const router = express.Router();
const { getStudentsByTeacher } = require('../controllers/activityReportController');

/**
 * @swagger
 * /api/activity-report/teacher/{teacherId}:
 *   get:
 *     summary: Get students by teacherId
 *     description: Returns a JSON list of students enrolled in courses taught by a specific teacher.
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher to filter students
 *     responses:
 *       200:
 *         description: Students data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studentName:
 *                     type: string
 *                   level:
 *                     type: integer
 *                   totalHoursConnected:
 *                     type: number
 *                   subjectName:
 *                     type: string
 *                   course:
 *                     type: string
 *                   teacherName:
 *                     type: string
 *       404:
 *         description: No students found for this teacherId
 *       400:
 *         description: Invalid or missing teacherId parameter
 *       500:
 *         description: Internal server error
 */
router.get('/activity-report/teacher/:teacherId', getStudentsByTeacher);

module.exports = router;