import kitService from '../services/kit.service.js'


const kitController = {
    async getAll(req, res) {

        try {
            const kits = await kitService.getAll()

            res.status(200).json({
                success:true,
                data: kits,
                message: 'Kits obtenidos exitosamente'
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Hubo un error interno al intentar obtener los kits',
                error: error.message
            })
        }
    },

    async getByID(req,res) {
        try {
            const { id } = req.params;
            const kit = await kitService.getByID(id);
    
            if (!kit) {
                return res.status(404).json({
                    success: false,
                    message: "Kit no encontrado"
                });
            }
    
            res.status(200).json({
                success: true,
                data: producto,
                message: "Kit obtenido correctamente"
            });
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener el kit",
                error: error.message,
            });
        }
      },
    
      //POST - crear un nuevo kit
      async create(req, res) {
        try {
          const kitData = req.body;
          const nuevoKit = await productKit.create(kitData);
    
          res.status(201).json({
            success: true,
            data: nuevoKit,
            message: "Kit creado correctamente",
          });
    
        } catch (error) {
          res.status(400).json({
            success: false,
            message: "Error al crear el kit",
            error: error.message,
          });
        }
      },
    
      //PUT - actualizar un kit
      async update(req, res) {
        try {
          const { id } = req.params;
          const kitData = req.body;
          
          const kitActualizado = await productService.update(id, kitData);
    
          if (!kitActualizado) {
            return res.status(404).json({
              success: false,
              message: "Kit no encontrado"
            });
          }
    
          res.status(200).json({
            success: true,
            data: kitActualizado,
            message: "Kit actualizado correctamente",
          });
    
        } catch (error) {
          res.status(400).json({
            success: false,
            message: "Error al actualizar el kit",
            error: error.message,
          });
        }
      },
    
      //DELETE - eliminar un kit (soft delete)
      async delete(req, res) {
        try {
          const { id } = req.params;
          const kitEliminado = await kitService.delete(id);
    
          if (!kitoEliminado) {
            return res.status(404).json({
              success: false,
              message: "Kit no encontrado"
            });
          }
    
          res.status(200).json({
            success: true,
            message: "Kit eliminado correctamente",
          });
    
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Error al eliminar el kit",
            error: error.message,
          });
        }
      }
} 

export default kitController;