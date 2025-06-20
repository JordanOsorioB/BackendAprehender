const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las Units
const getUnits = async (req, res) => {
  try {
    const units = await prisma.unit.findMany();
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo unidades.", details: error.message });
  }
};

// Obtener Unit por ID
const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await prisma.unit.findUnique({ where: { id: parseInt(id) } });
    if (!unit) return res.status(404).json({ error: "Unidad no encontrada." });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo unidad.", details: error.message });
  }
};

// Crear una nueva Unit
const createUnit = async (req, res) => {
  const { title, description, order, courseId, subjectId } = req.body;

  console.log("📥 Datos recibidos:", req.body);

  if (
    !title?.trim() ||
    !description?.trim() ||
    isNaN(parseInt(order)) ||
    !courseId?.trim() ||
    !subjectId?.trim()
  ) {
    return res.status(400).json({
      error: "Campos 'title', 'description', 'order', 'courseId' y 'subjectId' son obligatorios.",
    });
  }

  try {
    // 🔢 Obtener el próximo ID para la tabla Unit
    const lastUnit = await prisma.unit.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });

    const nextUnitId = lastUnit ? lastUnit.id + 1 : 1;

    // ✅ Crear nueva unidad
    const newUnit = await prisma.unit.create({
      data: {
        id: nextUnitId,
        title,
        description,
        order: parseInt(order, 10),
        courseId,
      },
    });

    // 🔢 Obtener el próximo ID para la tabla SubjectUnit
    const lastSubjectUnit = await prisma.subjectUnit.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });

    const nextSubjectUnitId = lastSubjectUnit ? lastSubjectUnit.id + 1 : 1;

    // ✅ Crear la relación en SubjectUnit
    await prisma.subjectUnit.create({
      data: {
        id: nextSubjectUnitId,
        title,
        description,
        order: parseInt(order, 10),
        subjectId,
        unitId: newUnit.id,
      },
    });

    res.status(201).json({ message: "Unidad y relación SubjectUnit creadas correctamente", unit: newUnit });
  } catch (error) {
    console.error("❌ Error al crear unidad:", error);
    res.status(500).json({ error: "Error al crear unidad", details: error.message });
  }
};





// Actualizar Unit por ID
const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { title, description, order } = req.body;

  try {
    const updatedUnit = await prisma.unit.update({
      where: { id: parseInt(id) },
      data: { title, description, order },
    });
    res.json(updatedUnit);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando unidad.", details: error.message });
  }
};

// Eliminar Unit por ID
const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.unit.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Unidad eliminada." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando unidad.", details: error.message });
  }
};

// Obtener unidades por subjectId (relación SubjectUnit → Unit)
const getUnitsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subjectUnits = await prisma.subjectUnit.findMany({
      where: { subjectId },
      include: {
        unit: true,
      },
      orderBy: {
        unit: {
          order: "asc",
        },
      },
    });

    const units = subjectUnits.map((su) => su.unit);
    res.json(units);
  } catch (error) {
    console.error("Error al obtener unidades por asignatura:", error);
    res.status(500).json({ error: "Error al obtener unidades" });
  }
};

module.exports = {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
  getUnitsBySubject,
};

