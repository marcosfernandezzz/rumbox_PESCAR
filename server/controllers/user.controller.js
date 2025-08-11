import userService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

const userController = {
  // Registrar un usuario
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Validaciones
      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Nombre, email y contraseña son requeridos" 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "La contraseña debe tener al menos 6 caracteres"
        });
      }

      const user = await userService.register(name, email, password, role);

      return res.status(201).json({
        success: true,
        data: user,
        message: "Usuario registrado exitosamente"
      });
    } catch (error) {
      console.log("Error en registro:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Error al registrar al usuario"
      });
    }
  },

  // Login de usuario
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

      const user = await userService.login(email, password);

      // Generar JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'tu_secreto_jwt',
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        data: user,
        token: token,
        message: "Usuario autenticado exitosamente"
      });
    } catch (error) {
      console.log("Error en login:", error.message);
      return res.status(401).json({
        success: false,
        message: error.message || "Error al iniciar sesión"
      });
    }
  },

  // Obtener perfil del usuario
  async getProfile(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json({
        success: true,
        data: user,
        message: "Perfil obtenido exitosamente"
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message || "Error al obtener perfil"
      });
    }
  }
};

export default userController;
