import express from 'express'
import adminController from '../controllers/admin.controller.js'

const router = express.Router();

// Rutas de administración
router.post('/login', adminController.login)
router.get('/profile/:id', adminController.getProfile)
router.post('/create', adminController.createAdmin) // Solo para setup inicial

export default router; 