import User from "../models/user.model.js";
import bcrypt from 'bcrypt';


//Registrar un usuario
const userService = {
  async register(name, email, password) {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("Ya existe un usuario con ese email");
      }

      //Crear un nuevo usuario
      const newUser = await User.create({ name, email, password });

      //Retornar el usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = newUser.toJSON();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error al registrar al usuario: ${error.message}`);
    }
  },

    //Login de usuario
    async login(email, password){
        try {

            const user = await User.findOne({ email: email });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta');
            }
            
            const { password: _, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;

        } catch (error) {
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    }
};

export default userService;
