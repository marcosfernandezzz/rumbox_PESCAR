import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// Ruta de prueba para autenticación
router.get("/test", (req, res) => {
  res.json({ message: "API de autenticación funcionando" });
});

// Ruta de registro
router.post("/register", userController.register);

// Ruta de login
router.post("/login", userController.login);

// Ruta para obtener perfil de usuario
router.get("/profile/:id", userController.getProfile);

export default router;
