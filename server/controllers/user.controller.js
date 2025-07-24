import userService from "../services/user.service.js";


const userController = {

  //Registrar un usuario
  async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Email y contraseña son requeridos" 
        });
      }

      const user = await userService.register(email, password);

      return res.status(201).json({
        success: true,
        data: user,
        message: "Usuario registrado exitosamente"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Error al registrar al usuario"
      });

    }
  },

  //Login de usuario
  async login(req, res) {

    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Email y contraseña son requeridos" 
        });
      }

      const user = await userService.login(email, password);

      return res.status(200).json({
        success: true,
        data: user,
        message: "Usuario autenticado exitosamente"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Error al iniciar sesión"
      });
    }
  }

}

export default userController;
