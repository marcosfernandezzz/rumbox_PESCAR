import productService from "../services/product.service.js";

const productController = {
  //GET - obtener todos los productos
  async getAll(req, res) {
    try {
      const productos = await productService.getAll();

      res.status(200).json({
        success: true,
        data: productos,
        message: "Productos obtenidos correctamente",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  },

  //GET - obtener un solo producto por ID
  async getByID(req,res) {
    try {
        const { id } = req.params;
        const producto = await productService.getByID(id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: producto,
            message: "Producto obtenido correctamente"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: error.message,
        });
    }
  }
};

export default productController;
