import express from 'express'
import kitController from '../controllers/kit.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'; // Importar el middleware de subida

const router = express.Router()

//GET - 'api/kits/'
router.get('/', kitController.getAll)

//GET 'api/kits/:id'
router.get('/:id', kitController.getByID)

//POST - 'api/kits/'
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, upload.single('image'), kitController.create)

//PUT - 'api/kits/:id'
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, upload.single('image'), kitController.update)

//PUT - 'api/kits/:id'
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, kitController.delete)

export default router
