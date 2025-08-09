import * as saleService from '../services/sales.service.js';

export const createSale = async (req, res, next) => {
    try {
        const newSale = await saleService.createSale(req.body);
        res.status(201).json({
            success: true,
            data: newSale,
            message: 'Venta creada exitosamente',
        });
    } catch (error) {
        next(error);
    }
};

export const getSales = async (req, res, next) => {
    try {
        const sales = await saleService.getSales();
        res.status(200).json({
            success: true,
            data: sales,
            message: 'Ventas obtenidas exitosamente',
        });
    } catch (error) {
        next(error);
    }
};

export const getSaleById = async (req, res, next) => {
    try {
        const sale = await saleService.getSaleById(req.params.id);
        res.status(200).json({
            success: true,
            data: sale,
            message: 'Venta obtenida exitosamente',
        });
    } catch (error) {
        next(error);
    }
};

export const updateSale = async (req, res, next) => {
    try {
        const updatedSale = await saleService.updateSale(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: updatedSale,
            message: 'Venta actualizada exitosamente',
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSale = async (req, res, next) => {
    try {
        await saleService.deleteSale(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Venta eliminada exitosamente',
        });
    } catch (error) {
        next(error);
    }
};
