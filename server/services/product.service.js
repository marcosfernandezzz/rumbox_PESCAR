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
        const producto = await Producto.findById(id)
        return producto

    } catch(error) {
        throw new Error(error)
    }
  }


};

export default productService;
