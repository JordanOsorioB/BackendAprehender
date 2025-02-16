require("dotenv").config();
require("./testDB");

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

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

applyMigrations();
// Configuración del puerto para Render
const PORT = process.env.PORT || 10000; // ⚠️ Cambia esto
console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.listen(PORT, "0.0.0.0", () => {
  // 👈 IMPORTANTE: Agrega "0.0.0.0"
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
