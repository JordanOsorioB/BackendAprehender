const express = require('express');
const router = express.Router();
const { getStudentsByTeacher } = require('../controllers/activityReportController');

/**
 * @swagger
 * /api/activity-report/teacher/{teacherId}:
 *   get:
 *     summary: Generate activity report Excel file for students by teacherId
 *     description: Generates and downloads an Excel file containing detailed activity report of students enrolled in courses taught by a specific teacher. The report includes student information, connection hours, courses, subjects, units, and completion percentages.
 *     tags:
 *       - Activity Reports
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher to generate the activity report for
 *     responses:
 *       200:
 *         description: Excel file generated and downloaded successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Attachment filename for the Excel file
 *             schema:
 *               type: string
 *               example: 'attachment; filename="reporte_actividad2025-06-17.xlsx"'
 *           Content-Type:
 *             description: MIME type for Excel files
 *             schema:
 *               type: string
 *               example: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
 *       404:
 *         description: No students found for this teacherId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No students found for this teacherId."
 *       400:
 *         description: Invalid or missing teacherId parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing teacherId parameter."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 * 
 */
router.get('/activity-report/teacher/:teacherId', getStudentsByTeacher);

module.exports = router;