import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Solo necesitas una línea para servir toda la carpeta "public"
router.use('/public', express.static(path.join(__dirname, 'public')));
// Elimina la línea redundante que servía solo la carpeta 'img'

export default router;