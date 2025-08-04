import Producto from "../models/product.model.js";

const productService = {
  async getAll() {
    try {
      const productos = await Producto.find({ activo: true });
      return productos;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getByID(id) {
    try {
        const producto = await Producto.findById(id);
        return producto;
    } catch(error) {
        throw new Error(error);
    }
  },

  async create(productoData) {
    try {
      const nuevoProducto = new Producto(productoData);
      const productoGuardado = await nuevoProducto.save();
      return productoGuardado;
    } catch (error) {
      throw new Error(error);
    }
  },

  async update(id, productoData) {
    try {
      const productoActualizado = await Producto.findByIdAndUpdate(
        id,
        productoData,
        { new: true, runValidators: true }
      );
      return productoActualizado;
    } catch (error) {
      throw new Error(error);
    }
  },

  async delete(id) {
    try {
      // Soft delete - solo cambia el estado a inactivo
      const productoEliminado = await Producto.findByIdAndUpdate(
        id,
        { activo: false },
        { new: true }
      );
      return productoEliminado;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default productService;
