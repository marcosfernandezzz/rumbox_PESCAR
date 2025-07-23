import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//Registrar un usuario
export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" })

  } catch (error) {
     
    res.status(500).json({ message: "Error al registrar el usuario", error })
  }
};

//Login de usuario
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" }) 
        
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" })

        res.json({ message: "Login exitoso" })
        
    } catch (error) {
        res.status(500).json({ message: "Error al ingresar el usuario", error })
    }
}
