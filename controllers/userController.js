const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  }
}

testDB();

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    console.log("🔍 Consultando usuarios...");
    const users = await prisma.user.findMany();
    console.log("✅ Usuarios obtenidos correctamente.");
    res.json(users);
  } catch (error) {
    console.error("❌ ERROR Prisma - No se pudo obtener usuarios:", error);
    res.status(500).json({
      error: "⚠️ Error obteniendo usuarios.",
      details: error.message,
    });
  }
};

// Crear un nuevo usuario con validación de rol
const createUser = async (req, res) => {
  const { username, email, password, role, schoolId } = req.body;

  if (!username || !email || !password || !role) {
    return res
      .status(400)
      .json({
        error:
          "⚠️ Todos los campos son obligatorios (username, email, password, role).",
      });
  }

  // Verificar que el rol sea válido
  const validRoles = ["ADMIN", "TEACHER", "STUDENT"];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ error: "⚠️ Rol inválido. Debe ser ADMIN, TEACHER o STUDENT." });
  }

  try {
    // Verificar si el usuario ya existe (por email o username)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "⚠️ El correo o el nombre de usuario ya están registrados.",
        });
    }

    // Crear usuario con el rol especificado
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role,
        schoolId, // Puede ser nulo si el usuario no pertenece a ninguna escuela
      },
    });

    res.json({ message: "✅ Usuario registrado con éxito.", user: newUser });
  } catch (error) {
    console.error("Error en createUser:", error);
    res
      .status(500)
      .json({ error: "⚠️ Error creando usuario.", details: error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return res.status(404).json({ error: "⚠️ Usuario no encontrado." });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo usuario." });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  // Validación de rol
  const validRoles = ["ADMIN", "TEACHER", "STUDENT"];
  if (role && !validRoles.includes(role)) {
    return res
      .status(400)
      .json({ error: "⚠️ Rol inválido. Debe ser ADMIN, TEACHER o STUDENT." });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password, role },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error actualizando usuario." });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: "✅ Usuario eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error eliminando usuario." });
  }
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
