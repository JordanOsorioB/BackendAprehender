const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los materiales
const getStudyMaterials = async (req, res) => {
  try {
    const materials = await prisma.studyMaterial.findMany({ include: { subject: true } });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo materiales.", details: error.message });
  }
};

// Obtener materiales por asignatura
const getStudyMaterialsBySubject = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const materials = await prisma.studyMaterial.findMany({ where: { subjectId }, include: { subject: true } });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo materiales por asignatura.", details: error.message });
  }
};

// Crear material
const createStudyMaterial = async (req, res) => {
  const { title, description, type, url, subjectId } = req.body;
  if (!title || !type || !url) {
    return res.status(400).json({ error: "Faltan campos obligatorios (title, type, url)." });
  }
  try {
    const material = await prisma.studyMaterial.create({
      data: { title, description, type, url, subjectId },
    });
    res.json({ message: "Material creado con éxito.", material });
  } catch (error) {
    res.status(500).json({ error: "Error creando material.", details: error.message });
  }
};

// Actualizar material
const updateStudyMaterial = async (req, res) => {
  const { id } = req.params;
  const { title, description, type, url, subjectId } = req.body;
  try {
    const material = await prisma.studyMaterial.update({
      where: { id },
      data: { title, description, type, url, subjectId },
    });
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando material.", details: error.message });
  }
};

// Eliminar material
const deleteStudyMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.studyMaterial.delete({ where: { id } });
    res.json({ message: "Material eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando material.", details: error.message });
  }
};

// Obtener materiales de estudio de todas las asignaturas asignadas a un estudiante
const getStudyMaterialsForStudent = async (req, res) => {
  const { id } = req.params; // id del estudiante
  try {
    // Buscar las asignaturas asignadas al estudiante
    const subjectProgress = await prisma.studentSubjectProgress.findMany({
      where: { studentId: id },
      include: { subject: { include: { studyMaterials: true } } }
    });
    // Formatear la respuesta agrupando por asignatura
    const result = subjectProgress.map(sp => ({
      subjectId: sp.subjectId,
      subjectName: sp.subject.name,
      studyMaterials: sp.subject.studyMaterials
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo materiales del estudiante.", details: error.message });
  }
};

module.exports = { getStudyMaterials, getStudyMaterialsBySubject, createStudyMaterial, updateStudyMaterial, deleteStudyMaterial, getStudyMaterialsForStudent }; 