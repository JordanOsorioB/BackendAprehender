require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
