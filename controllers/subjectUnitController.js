const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSubjectUnits = async (req, res) => {
    try {
        const units = await prisma.subjectUnit.findMany();
        res.json(units);
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error fetching subject units." });
    }
};

const createSubjectUnit = async (req, res) => {
    const { subjectId, title, description, order } = req.body;
    if (!subjectId || !title) {
        return res.status(400).json({ error: "⚠️ Subject ID and title are required." });
    }

    try {
        const unit = await prisma.subjectUnit.create({ data: { subjectId, title, description, order } });
        res.json({ message: "✅ Subject unit created successfully.", unit });
    } catch (error) {
        res.status(500).json({ error: "⚠️ Error creating subject unit." });
    }
};

module.exports = { getSubjectUnits, createSubjectUnit };
