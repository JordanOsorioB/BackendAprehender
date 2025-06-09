require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { verifyToken } = require("./controllers/authController");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const unitRoutes = require("./routes/unitRoutes");
const levelRoutes = require("./routes/levelRoutes");
const exerciseStatusRoutes = require("./routes/exerciseStatusRoutes");
const exerciseContentRoutes = require("./routes/exerciseContentRoutes");
const developmentContentRoutes = require("./routes/developmentContentRoutes");
const pairingContentRoutes = require("./routes/pairingContentRoutes");
const pairingPairRoutes = require("./routes/pairingPairRoutes");
const profilePictureGalleryRoutes = require('./routes/profilePictureGalleryRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(cors());
app.use(express.json());

// Swagger primero, en /docs
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación',
      version: '1.0.0',
      description: 'Documentación de la API del backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  docExpansion: 'none',
  customCss: '.swagger-ui { margin-bottom: 60px; }'
}));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente.");
});

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/profile-pictures', profilePictureGalleryRoutes);

// Rutas protegidas bajo /api
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/courses', verifyToken, courseRoutes);
app.use('/api/schools', verifyToken, schoolRoutes);
app.use('/api/teachers', verifyToken, teacherRoutes);
app.use('/api/subjects', verifyToken, subjectRoutes);
app.use('/api/students', verifyToken, studentRoutes);
app.use('/api/exercises', verifyToken, exerciseRoutes);
app.use('/api/units', verifyToken, unitRoutes);
app.use('/api/levels', verifyToken, levelRoutes);
app.use('/api/exercise-statuses', verifyToken, exerciseStatusRoutes);
app.use('/api/exercise-contents', verifyToken, exerciseContentRoutes);
app.use('/api/development-contents', verifyToken, developmentContentRoutes);
app.use('/api/pairing-contents', verifyToken, pairingContentRoutes);
app.use('/api/pairing-pairs', verifyToken, pairingPairRoutes);

async function applyMigrations() {
  try {
    await prisma.$executeRaw`SELECT 1`; // Simple consulta para verificar conexión
    console.log("✅ Base de datos accesible.");
  } catch (error) {
    console.error("❌ No se puede acceder a la base de datos:", error);
  }
}

applyMigrations();
const PORT = process.env.PORT || 3000; 
console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
