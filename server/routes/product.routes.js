import express from 'express'
import productController from '../controllers/product.controller.js'

const router = express.Router();

router.get('/', productController.getAll) // GET /api/products/

router.get('/:id', productController.getByID) // GET /api/products/:id

/* router.post('/', productController.create) */ // POST /api/products/

/* router.put('/:id', productController.update) */ // PUT /api/products/:id

/* router.delete('/:id', productController.delete) */ // DELETE /api/products/:id


export default router;

