import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

// Crear una nueva venta
const createSale = async (req, res) => {
    try {
        const { userId, products } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let totalAmount = 0;
        const productsForSale = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Stock insuficiente para el producto ${product.nombre}` });
            }

            // Actualizar el stock del producto
            product.stock -= item.quantity;
            await product.save();

            totalAmount += product.precio * item.quantity;
            productsForSale.push({
                productId: item.productId,
                quantity: item.quantity,
                priceAtSale: product.precio
            });
        }

        const newSale = new Sale({
            userId,
            products: productsForSale,
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
        const sales = await Sale.find().populate('userId', 'username email').populate('products.productId', 'nombre precio');
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

export {
    createSale,
    getSales,
    getSaleById,
    getSalesByUserId
};
