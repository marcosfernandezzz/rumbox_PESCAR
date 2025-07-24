import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// Registrar un usuario
router.post("/register", userController.register);

// Login de usuario
router.post("/login", userController.login);

export default router;
