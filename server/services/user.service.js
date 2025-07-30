import User from "../models/user.model.js";

const userService = {
  // Registrar un usuario
  async register(name, email, password) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("Ya existe un usuario con ese email");
      }

      // Crear un nuevo usuario
      const newUser = new User({
        name,
        email,
        password
      });

      await newUser.save();

      // Retornar el usuario sin la contraseña
      return newUser.toJSON();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Ya existe un usuario con ese email");
      }
      throw new Error(`Error al registrar al usuario: ${error.message}`);
    }
  },

  // Login de usuario
  async login(email, password) {
    try {
      // Buscar usuario por email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar contraseña
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }
      
      // Retornar usuario sin contraseña
      return user.toJSON();
    } catch (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  },

  // Obtener usuario por ID
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user.toJSON();
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }
};

export default userService;
