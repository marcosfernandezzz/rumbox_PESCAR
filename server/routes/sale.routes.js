import express from 'express';
import salesController from '../controllers/sale.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // Importar el objeto authMiddleware
const { verifyToken, verifyAdmin } = authMiddleware; // Desestructurar las funciones

const router = express.Router();

// POST - /api/sales - Crear una nueva venta (requiere autenticación)
router.post('/', verifyToken, salesController.createSale);

// GET - /api/sales - Obtener todas las ventas (requiere ser admin)
router.get('/', verifyToken, verifyAdmin, salesController.getSales);

// GET - /api/sales/:id - Obtener una venta por ID (requiere ser admin)
router.get('/:id', verifyToken, verifyAdmin, salesController.getSaleById);

// GET - /api/sales/user/:userId - Obtener ventas por ID de usuario (requiere autenticación)
router.get('/user/:userId', verifyToken, salesController.getSalesByUserId);

export default router;
