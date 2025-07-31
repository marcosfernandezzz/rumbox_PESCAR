import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Ruta para obtener datos del cliente (ejemplo)
router.get("/data", (req, res) => {
  res.json({
    message: "Datos del cliente",
    timestamp: new Date().toISOString(),
    data: {
      productos: [
        { id: 1, nombre: "Producto 1", precio: 100 },
        { id: 2, nombre: "Producto 2", precio: 200 }
      ]
    }
  });
});

// Ruta para obtener productos
router.get("/productos", (req, res) => {
  res.json({
    productos: [
      { id: 1, nombre: "Pescado Fresco", precio: 150, categoria: "Pescados" },
      { id: 2, nombre: "Camarones", precio: 300, categoria: "Mariscos" },
      { id: 3, nombre: "Langosta", precio: 500, categoria: "Mariscos" }
    ]
  });
});

export default router;
