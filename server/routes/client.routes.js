import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RUTAS PARA CLIENTES (página principal)

//Login de usuario
router.get("/", (req, res) => {
  
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"))
})

//Registro de usuario
router.get("/register", (req, res) => {
 res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"))
})

export default router;