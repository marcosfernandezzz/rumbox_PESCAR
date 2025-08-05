import adminService from "../services/admin.service.js";
import jwt from 'jsonwebtoken';

const adminController = {
  // Login de administrador
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Email y contraseña son requeridos" 
        });
      }

      const admin = await adminService.login(email, password);

      // Generar JWT token específico para admin
      const token = jwt.sign(
        { 
          adminId: admin._id, 
          email: admin.email,
          type: 'admin'
        },
        process.env.JWT_SECRET || 'tu_secreto_jwt',
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        data: admin,
        token: token,
        message: "Administrador autenticado exitosamente"
      });
    } catch (error) {
      console.log("Error en login de admin:", error.message);
      return res.status(401).json({
        success: false,
        message: error.message || "Error al iniciar sesión"
      });
    }
  },

  // Obtener perfil del administrador
  async getProfile(req, res) {
    try {
      const { id } = req.params;
      const admin = await adminService.getAdminById(id);

      return res.status(200).json({
        success: true,
        data: admin,
        message: "Perfil de administrador obtenido exitosamente"
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message || "Error al obtener perfil"
      });
    }
  },

  // Crear administrador (solo para setup inicial)
  async createAdmin(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Email y contraseña son requeridos" 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "La contraseña debe tener al menos 6 caracteres"
        });
      }

      const admin = await adminService.createAdmin(email, password);

      return res.status(201).json({
        success: true,
        data: admin,
        message: "Administrador creado exitosamente"
      });
    } catch (error) {
      console.log("Error al crear admin:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Error al crear administrador"
      });
    }
  }
};

export default adminController; 