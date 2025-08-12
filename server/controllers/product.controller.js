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
  },

  //POST - crear un nuevo producto
  async create(req, res) {
    try {
      const productoData = { ...req.body };
      
      // Verificar si se subió una imagen
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "La imagen del producto es requerida."
        });
      }
      
      productoData.image = req.file.filename; // Guardar el nombre del archivo subido
      
      const nuevoProducto = await productService.create(productoData);

      res.status(201).json({
        success: true,
        data: nuevoProducto,
        message: "Producto creado correctamente",
      });

    } catch (error) {
      console.error("Error detallado al crear producto:", error); // Log detallado del error
      res.status(400).json({
        success: false,
        message: "Error al crear el producto",
        error: error.message,
      });
    }
  },

  //PUT - actualizar un producto
  async update(req, res) {
    try {
      const { id } = req.params;
      const productoData = { ...req.body };
      if (req.file) {
        productoData.image = req.file.filename; // Guardar el nombre del archivo subido
      }
      
      const productoActualizado = await productService.update(id, productoData);

      if (!productoActualizado) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado"
        });
      }

      res.status(200).json({
        success: true,
        data: productoActualizado,
        message: "Producto actualizado correctamente",
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar el producto",
        error: error.message,
      });
    }
  },

  //DELETE - eliminar un producto (soft delete)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const productoEliminado = await productService.delete(id);

      if (!productoEliminado) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado"
        });
      }

      res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar el producto",
        error: error.message,
      });
    }
  }
};

export default productController;
