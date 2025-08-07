import express from 'express'
import userController from "../controllers/user.controller.js";

const router = express.Router()

//GET - /api/users/:id
router.get('/:id', userController.getProfile)

//PUT - /api/users/:id
router.put('/:id', userController.getProfile)

//PUT - /api/users/:id/inventory
/* router.put('/:id/inventory', userController.updateInventory) */

export default router
