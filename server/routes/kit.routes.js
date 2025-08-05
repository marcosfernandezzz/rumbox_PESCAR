import express from 'express'
import kitController from '../controllers/kit.controller.js'
import adminMiddleware from '../middlewares/admin.middleware.js'

const router = express.Router()

//GET - 'api/kits/'
router.get('/', kitController.getAll)

//GET 'api/kits/:id'
router.get('/:id', kitController.getByID)

//POST - 'api/kits/'
router.post('/', adminMiddleware.verifyAdminToken, kitController.create)

//PUT - 'api/kits/:id'
router.put('/:id', adminMiddleware.verifyAdminToken, kitController.update)

//PUT - 'api/kits/:id'
router.delete('/:id', adminMiddleware.verifyAdminToken, kitController.delete)

export default router