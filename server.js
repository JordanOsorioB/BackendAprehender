require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

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

// Configuración del puerto para Render
const PORT = process.env.PORT || 10000; // ⚠️ Cambia esto

app.listen(PORT, "0.0.0.0", () => {
  // 👈 IMPORTANTE: Agrega "0.0.0.0"
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
