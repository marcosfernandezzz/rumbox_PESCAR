import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';
import Kit from '../models/kits.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/errors.js';

// Crear una nueva venta
const createSale = async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const itemsForSale = [];

        for (const item of products) {
            let product;
            if (item.itemType === 'Product') {
                product = await Product.findById(item.itemId);
            } else if (item.itemType === 'Kit') {
                product = await Kit.findById(item.itemId);
            }

            if (!product) {
                return res.status(404).json({ message: `Artículo con ID ${item.itemId} no encontrado` });
            }
            if (product.cantidad < item.quantity) {
                return res.status(400).json({ message: `Stock insuficiente para el artículo ${product.nombre}` });
            }

            // Actualizar el stock del producto o kit
            product.cantidad -= item.quantity;
            await product.save();

            itemsForSale.push({
                itemId: item.itemId,
                itemType: item.itemType,
                quantity: item.quantity,
                priceAtSale: product.precio
            });
        }

        const newSale = new Sale({
            userId,
            products: itemsForSale,
            totalAmount
        });

        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Obtener todas las ventas
const getSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate('userId', 'name email')
            .populate({
                path: 'products.itemId',
                select: 'nombre precio'
            });
        res.status(200).json(sales);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Obtener una venta por ID
const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await Sale.findById(id).populate('userId', 'username email').populate('products.productId', 'nombre precio');
        if (!sale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.status(200).json(sale);
    } catch (error) {
        errorHandler(res, error);
    }
};

// Obtener ventas por ID de usuario
const getSalesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const sales = await Sale.find({ userId }).populate('userId', 'username email').populate('products.productId', 'nombre precio');
        res.status(200).json(sales);
    } catch (error) {
        errorHandler(res, error);
    }
};

const salesController = {
    createSale,
    getSales,
    getSaleById,
    getSalesByUserId
};

export default salesController;
