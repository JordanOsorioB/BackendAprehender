const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const prisma = new PrismaClient();

// Configuración del transporter de email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambiar por tu proveedor de email
  auth: {
    user: process.env.EMAIL_USER || 'tu-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'tu-contraseña-de-aplicacion'
  }
});

// Función para enviar email de restablecimiento
const sendResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'tu-email@gmail.com',
    to: email,
    subject: 'Restablecimiento de Contraseña - Aprehender',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #004080; text-align: center;">Restablecimiento de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña en la plataforma Aprehender.</p>
        <p>Haz clic en el siguiente botón para continuar:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #004080; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Restablecer Contraseña
          </a>
        </div>
        <p><strong>Importante:</strong> Este enlace expirará en 1 hora por seguridad.</p>
        <p>Si no solicitaste este cambio, puedes ignorar este email de forma segura.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          Este es un email automático, por favor no respondas a este mensaje.
        </p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// POST /auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        message: 'El email es requerido',
        success: false
      });
    }
    
    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(404).json({
        message: 'No se encontró un usuario con ese correo electrónico',
        success: false
      });
    }
    
    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    
    // Eliminar tokens anteriores del usuario
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id }
    });
    
    // Guardar nuevo token
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt
      }
    });
    
    // Enviar email
    await sendResetEmail(email, token);
    
    res.json({
      message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico',
      success: true
    });
  } catch (error) {
    console.error('Error en forgot-password:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      success: false
    });
  }
};

// GET /auth/verify-reset-token/:token
const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({
        valid: false,
        message: 'Token requerido'
      });
    }
    
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { 
        token,
        used: false,
        expiresAt: {
          gt: new Date()
        }
      }
    });
    
    if (!resetToken) {
      return res.status(400).json({
        valid: false,
        message: 'Token inválido o expirado'
      });
    }
    
    res.json({
      valid: true,
      message: 'Token válido'
    });
  } catch (error) {
    console.error('Error en verify-reset-token:', error);
    res.status(500).json({
      valid: false,
      message: 'Error interno del servidor'
    });
  }
};

// POST /auth/reset-password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({
        message: 'Token y nueva contraseña son requeridos',
        success: false
      });
    }
    
    // Validar contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
      return res.status(400).json({
        message: 'La contraseña debe tener al menos 6 caracteres',
        success: false
      });
    }
    
    // Verificar token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { 
        token,
        used: false,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    });
    
    if (!resetToken) {
      return res.status(400).json({
        message: 'Token inválido o expirado',
        success: false
      });
    }
    
    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Actualizar contraseña del usuario
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    });
    
    // Marcar token como usado
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    });
    
    res.json({
      message: 'Contraseña actualizada exitosamente',
      success: true
    });
  } catch (error) {
    console.error('Error en reset-password:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      success: false
    });
  }
};

module.exports = {
  forgotPassword,
  verifyResetToken,
  resetPassword
}; 