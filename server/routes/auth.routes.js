import express from "express";
import {register, login} from "../controllers/user.controller.js";

const router = express.Router();

// Registrar un usuario
router.post("/register", register);

// Login de usuario
router.post("/login", login);

export default router;