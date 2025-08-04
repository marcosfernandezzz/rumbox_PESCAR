import Admin from "../models/admin.model.js";

const adminService = {
  // Login de administrador
  async login(email, password) {
    try {
      // Buscar administrador por email y que esté activo
      const admin = await Admin.findOne({ email, activo: true });

      if (!admin) {
        throw new Error('Administrador no encontrado o inactivo');
      }

      // Verificar contraseña
      const isPasswordValid = await admin.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }
      
      // Retornar administrador sin contraseña
      return admin.toJSON();
    } catch (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  },

  // Obtener administrador por ID
  async getAdminById(id) {
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        throw new Error('Administrador no encontrado');
      }
      return admin.toJSON();
    } catch (error) {
      throw new Error(`Error al obtener administrador: ${error.message}`);
    }
  },

  // Crear administrador (método para setup inicial)
  async createAdmin(email, password) {
    try {
      // Verificar si el administrador ya existe
      const existingAdmin = await Admin.findOne({ email });

      if (existingAdmin) {
        throw new Error("Ya existe un administrador con ese email");
      }

      // Crear un nuevo administrador
      const newAdmin = new Admin({
        email,
        password
      });

      await newAdmin.save();

      // Retornar el administrador sin la contraseña
      return newAdmin.toJSON();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Ya existe un administrador con ese email");
      }
      throw new Error(`Error al crear administrador: ${error.message}`);
    }
  }
};

export default adminService; 