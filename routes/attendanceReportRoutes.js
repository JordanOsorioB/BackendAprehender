const express = require("express");
const {
  generateAttendanceReportCSV,
  generateMonthlyAttendanceReport,
  getAttendanceStats
} = require("../controllers/attendanceReportController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attendance Reports
 *   description: Endpoints para reportes de asistencia
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AttendanceReport:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del reporte
 *         schoolId:
 *           type: string
 *           description: ID de la escuela
 *         courseId:
 *           type: string
 *           description: ID del curso
 *         studentId:
 *           type: string
 *           description: ID del estudiante
 *         year:
 *           type: integer
 *           description: Año del reporte
 *         month:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           description: Mes del reporte (1-12)
 *         day:
 *           type: integer
 *           minimum: 1
 *           maximum: 31
 *           description: Día del reporte (1-31)
 *         isPresent:
 *           type: boolean
 *           description: Indica si el estudiante estuvo presente
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 *     AttendanceStats:
 *       type: object
 *       properties:
 *         monthlyStats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               month:
 *                 type: integer
 *               studentId:
 *                 type: string
 *               _count:
 *                 type: object
 *               _sum:
 *                 type: object
 *         studentStats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               _count:
 *                 type: object
 *               _sum:
 *                 type: object
 *   parameters:
 *     schoolId:
 *       in: query
 *       name: schoolId
 *       required: true
 *       schema:
 *         type: string
 *       description: ID de la escuela
 *     courseId:
 *       in: query
 *       name: courseId
 *       required: true
 *       schema:
 *         type: string
 *       description: ID del curso
 *     year:
 *       in: query
 *       name: year
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 2020
 *         maximum: 2030
 *       description: Año del reporte
 *     month:
 *       in: query
 *       name: month
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 12
 *       description: Mes del reporte (1-12)
 */

/**
 * @swagger
 * /api/attendance-reports/csv/full-year:
 *   get:
 *     tags: [Attendance Reports]
 *     summary: Generar reporte CSV completo del año (marzo a diciembre)
 *     description: Genera un archivo CSV con el reporte de asistencia de marzo a diciembre para un curso específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/schoolId'
 *       - $ref: '#/components/parameters/courseId'
 *       - $ref: '#/components/parameters/year'
 *     responses:
 *       200:
 *         description: Archivo CSV generado exitosamente
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *             example: |
 *               Curso,Alumno,1,2,3,...,31,Total asistencia,Total ausencia
 *               "Matemática Básica","Juan Pérez",1,1,0,...,1,25,6
 *       400:
 *         description: Parámetros faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parámetros requeridos: schoolId, courseId, year"
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Curso no encontrado"
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/csv/full-year", generateAttendanceReportCSV);

/**
 * @swagger
 * /api/attendance-reports/csv/monthly:
 *   get:
 *     tags: [Attendance Reports]
 *     summary: Generar reporte CSV de un mes específico
 *     description: Genera un archivo CSV con el reporte de asistencia de un mes específico para un curso
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/schoolId'
 *       - $ref: '#/components/parameters/courseId'
 *       - $ref: '#/components/parameters/year'
 *       - $ref: '#/components/parameters/month'
 *     responses:
 *       200:
 *         description: Archivo CSV generado exitosamente
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *             example: |
 *               Curso,Alumno,1,2,3,...,31,Total asistencia,Total ausencia
 *               "Matemática Básica","Juan Pérez",1,1,0,...,1,25,6
 *       400:
 *         description: Parámetros faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parámetros requeridos: schoolId, courseId, year, month"
 *       404:
 *         description: Curso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/csv/monthly", generateMonthlyAttendanceReport);

/**
 * @swagger
 * /api/attendance-reports/stats:
 *   get:
 *     tags: [Attendance Reports]
 *     summary: Obtener estadísticas de asistencia
 *     description: Obtiene estadísticas de asistencia por mes y estudiante para un curso específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/schoolId'
 *       - $ref: '#/components/parameters/courseId'
 *       - $ref: '#/components/parameters/year'
 *     responses:
 *       200:
 *         description: Estadísticas de asistencia obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceStats'
 *       400:
 *         description: Parámetros faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parámetros requeridos: schoolId, courseId, year"
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/stats", getAttendanceStats);

module.exports = router;