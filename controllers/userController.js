const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

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
    // Excluir la contraseña de cada usuario
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    console.log("✅ Usuarios obtenidos correctamente.");
    res.json(usersWithoutPassword);
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
  const { username, email, password, role, schoolId, studentId } = req.body;

  if (!username || !email || !password || !role) {
    return res
      .status(400)
      .json({
        error:
          "⚠️ Todos los campos son obligatorios (username, email, password, role).",
      });
  }

  // Verificar que el rol sea válido
  const validRoles = ["ADMIN", "TEACHER", "STUDENT", "SUPERADMIN", "UTP"];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({
        error:
          "⚠️ Rol inválido. Debe ser ADMIN, TEACHER, STUDENT, SUPERADMIN o UTP.",
      });
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

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con el rol especificado y opcionalmente studentId
    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
      schoolId,
    };
    if (studentId) {
      userData.studentId = studentId;
    }

    const newUser = await prisma.user.create({
      data: userData,
    });

    // Excluir la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = newUser;

    res.json({
      message: "✅ Usuario registrado con éxito.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({
      error: "⚠️ Error creando usuario.",
      details: error.message,
    });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return res.status(404).json({ error: "⚠️ Usuario no encontrado." });
    // Excluir la contraseña
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "⚠️ Error obteniendo usuario." });
  }
};

// Actualizar usuario (CORREGIDO para aceptar teacherId)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, teacherId } = req.body;

  // Validación de rol
  const validRoles = ["ADMIN", "TEACHER", "STUDENT", "SUPERADMIN", "UTP"];
  if (role && !validRoles.includes(role)) {
    return res
      .status(400)
      .json({
        error:
          "⚠️ Rol inválido. Debe ser ADMIN, TEACHER, STUDENT, SUPERADMIN o UTP.",
      });
  }

  try {
    let dataToUpdate = { name, email, role };

    // Si se envía una nueva contraseña, encriptarla
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // Si se envía teacherId, actualizarlo también
    if (teacherId !== undefined) {
      dataToUpdate.teacherId = teacherId;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    // Excluir la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json(userWithoutPassword);
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

// Cambiar contraseña autenticando con usuario y contraseña actual
const cambiarContrasenaConCredenciales = async (req, res) => {
  const { username, password, newPassword } = req.body;
  if (!username || !password || !newPassword) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }
  try {
    // Buscar usuario por username
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }
    // Verificar contraseña actual
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }
    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });
    res.json({ message: 'Contraseña cambiada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error cambiando la contraseña.' });
  }
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser, cambiarContrasenaConCredenciales };
