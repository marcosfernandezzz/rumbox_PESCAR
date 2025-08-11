import express from 'express';
import { createSale, getSales, getSaleById, getSalesByUserId } from '../controllers/sale.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // Importar el objeto authMiddleware
const { verifyToken, verifyAdmin } = authMiddleware; // Desestructurar las funciones

const router = express.Router();

// POST - /api/sales - Crear una nueva venta (requiere autenticación)
router.post('/sales', verifyToken, createSale);

// GET - /api/sales - Obtener todas las ventas (requiere ser admin)
router.get('/sales', verifyToken, verifyAdmin, getSales);

// GET - /api/sales/:id - Obtener una venta por ID (requiere ser admin)
router.get('/sales/:id', verifyToken, verifyAdmin, getSaleById);

// GET - /api/sales/user/:userId - Obtener ventas por ID de usuario (requiere autenticación)
router.get('/sales/user/:userId', verifyToken, getSalesByUserId);

export default router;
