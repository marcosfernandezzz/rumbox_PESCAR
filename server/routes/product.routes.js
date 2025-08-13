import express from 'express'
import productController from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'; // Importar el middleware de subida

const router = express.Router();

// Rutas públicas (clientes)
router.get('/', productController.getAll)
router.get('/:id', productController.getByID)

// Rutas de administración (CRUD completo) - Protegidas con middleware de admin
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, upload.single('image'), productController.create)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, upload.single('image'), productController.update)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.delete)

export default router;
