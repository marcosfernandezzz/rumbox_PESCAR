import { Router } from 'express';
import {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
} from '../controllers/sale.controler.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.post('/', authMiddleware, createSale);
router.get('/', authMiddleware, adminMiddleware, getSales);
router.get('/:id', authMiddleware, getSaleById);
router.put('/:id', authMiddleware, adminMiddleware, updateSale);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSale);

export default router;
