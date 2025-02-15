require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
