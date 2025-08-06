import express from 'express'
import userController from "../controllers/user.controller.js";

const router = express.Router()

//GET - /api/users/:id
router.get('/', userController.getProfile)


export default router
