const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { nick, password } = req.body;

    // Buscar usuario por nick
    const user = await prisma.user.findFirst({
      where: { nick },
      include: {
        teacher: true,
        student: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const validPassword = password === user.password;
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token
    const token = jwt.sign(
      { 
        userId: user.id,
        nick: user.nick,
        role: user.role,
        teacherId: user.teacherId,
        studentId: user.studentId
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Devolver información del usuario y el token
    res.json({
      token,
      user: {
        id: user.id,
        nick: user.nick,
        email: user.email,
        role: user.role,
        teacher: user.teacher,
        student: user.student
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = {
  login,
  verifyToken
}; 