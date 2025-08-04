import express from 'express'
import productController from '../controllers/product.controller.js'
import adminMiddleware from '../middlewares/admin.middleware.js'

const router = express.Router();

// Rutas públicas (clientes)
router.get('/', productController.getAll)
router.get('/:id', productController.getByID)

// Rutas de administración (CRUD completo) - Protegidas con middleware de admin
router.post('/', adminMiddleware.verifyAdminToken, productController.create)
router.put('/:id', adminMiddleware.verifyAdminToken, productController.update)
router.delete('/:id', adminMiddleware.verifyAdminToken, productController.delete)

export default router;

