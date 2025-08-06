import express from 'express'
import userController from "../controllers/user.controller";

const router = express.Router()

//GET - /api/users/:id
router.get('/', userController.getProfile)
