const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las escuelas
const getSchools = async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo las escuelas." });
  }
};

// Crear una nueva escuela
const createSchool = async (req, res) => {
  const { name, address, code } = req.body;
  if (!name || !address || !code) {
    return res
      .status(400)
      .json({ error: "⚠️ Todos los campos son obligatorios." });
  }

  try {
    const existingSchool = await prisma.school.findUnique({ where: { code } });
    if (existingSchool) {
      return res
        .status(400)
        .json({ error: "⚠️ El código de la escuela ya está registrado." });
    }

    const school = await prisma.school.create({
      data: { name, address, code },
    });

    res.json({ message: "✅ Escuela creada correctamente.", school });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error creando la escuela." });
  }
};

// Obtener una escuela por ID
const getSchoolById = async (req, res) => {
  const { id } = req.params;
  try {
    const school = await prisma.school.findUnique({ where: { id } });
    if (!school)
      return res.status(404).json({ error: "⚠️ Escuela no encontrada." });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo la escuela." });
  }
};

// Actualizar escuela
const updateSchool = async (req, res) => {
  const { id } = req.params;
  const { name, address, code } = req.body;

  try {
    const updatedSchool = await prisma.school.update({
      where: { id },
      data: { name, address, code },
    });
    res.json(updatedSchool);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error actualizando la escuela." });
  }
};

// Eliminar escuela
const deleteSchool = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.school.delete({ where: { id } });
    res.json({ message: "✅ Escuela eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error eliminando la escuela." });
  }
};

module.exports = {
  getSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
