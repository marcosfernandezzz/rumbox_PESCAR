import SaleModel from '../models/sale.model.js';
import ProductModel from '../models/product.model.js';
import { NotFoundError, AppError } from '../utils/errors.js';

export const createSale = async (saleData) => {
    const { user, products, total } = saleData;

    // Verificar stock y actualizar productos
    for (const item of products) {
        const product = await ProductModel.findById(item.product);
        if (!product) {
            throw new NotFoundError(`Producto con ID ${item.product} no encontrado`);
        }
        if (product.stock < item.quantity) {
            throw new AppError(`Stock insuficiente para el producto ${product.name}`, 400);
        }
        product.stock -= item.quantity;
        await product.save();
    }

    const newSale = new SaleModel({
        user,
        products,
        total,
    });

    await newSale.save();
    return newSale;
};

export const getSales = async () => {
    const sales = await SaleModel.find().populate('user').populate('products.product');
    return sales;
};

export const getSaleById = async (id) => {
    const sale = await SaleModel.findById(id).populate('user').populate('products.product');
    if (!sale) {
        throw new NotFoundError('Venta no encontrada');
    }
    return sale;
};

export const updateSale = async (id, saleData) => {
    const updatedSale = await SaleModel.findByIdAndUpdate(id, saleData, { new: true });
    if (!updatedSale) {
        throw new NotFoundError('Venta no encontrada');
    }
    return updatedSale;
};

export const deleteSale = async (id) => {
    const deletedSale = await SaleModel.findByIdAndDelete(id);
    if (!deletedSale) {
        throw new NotFoundError('Venta no encontrada');
    }
    return deletedSale;
};
