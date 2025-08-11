import express from 'express'
import productController from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

// Rutas públicas (clientes)
router.get('/', productController.getAll)
router.get('/:id', productController.getByID)

// Rutas de administración (CRUD completo) - Protegidas con middleware de admin
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.create)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.update)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.delete)

export default router;
