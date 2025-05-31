require("dotenv").config();

const express = require("express");
const cors = require("cors");
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
const alternativeContentRoutes = require("./routes/alternativeContentRoutes");
const alternativeOptionRoutes = require("./routes/alternativeOptionRoutes");
const developmentContentRoutes = require("./routes/developmentContentRoutes");
const pairingContentRoutes = require("./routes/pairingContentRoutes");
const pairingPairRoutes = require("./routes/pairingPairRoutes");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente.");
});

async function applyMigrations() {
  try {
    await prisma.$executeRaw`SELECT 1`; // Simple consulta para verificar conexión
    console.log("✅ Base de datos accesible.");
  } catch (error) {
    console.error("❌ No se puede acceder a la base de datos:", error);
  }
}
app.use("/schools", schoolRoutes);
app.use("/teachers", teacherRoutes);
app.use("/subjects", subjectRoutes);
app.use('/students', studentRoutes);
app.use('/exercises', exerciseRoutes);
app.use("/units", unitRoutes);
app.use("/levels", levelRoutes);
app.use("/exercise-statuses", exerciseStatusRoutes);
app.use("/exercise-contents", exerciseContentRoutes);
app.use("/alternative-contents", alternativeContentRoutes);
app.use("/alternative-options", alternativeOptionRoutes);
app.use("/development-contents", developmentContentRoutes);
app.use("/pairing-contents", pairingContentRoutes);
app.use("/pairing-pairs", pairingPairRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación',
      version: '1.0.0',
      description: 'Documentación de la API del backend',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  docExpansion: 'none',
  customCss: '.swagger-ui { margin-bottom: 60px; }'
}));

applyMigrations();
const PORT = process.env.PORT || 3000; 
console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
