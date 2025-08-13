import kitService from '../services/kit.service.js'
import { errorHandler } from '../utils/errors.js';


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
            errorHandler(res, error);
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
                data: kit, // Corregido de 'producto' a 'kit'
                message: "Kit obtenido correctamente"
            });
    
        } catch (error) {
            errorHandler(res, error);
        }
      },
    
      //POST - crear un nuevo kit
      async create(req, res) {
        try {
          const kitData = { ...req.body };
          if (req.file) {
            kitData.image = req.file.filename; // Guardar el nombre del archivo subido
          }
          const nuevoKit = await kitService.create(kitData); // Corregido de 'productKit' a 'kitService'
    
          res.status(201).json({
            success: true,
            data: nuevoKit,
            message: "Kit creado correctamente",
          });
    
        } catch (error) {
          errorHandler(res, error);
        }
      },
    
      //PUT - actualizar un kit
      async update(req, res) {
        try {
          const { id } = req.params;
          const kitData = { ...req.body };
          if (req.file) {
            kitData.image = req.file.filename; // Guardar el nombre del archivo subido
          }
          
          const kitActualizado = await kitService.update(id, kitData); // Corregido de 'productService' a 'kitService'
    
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
          errorHandler(res, error);
        }
      },
    
      //DELETE - eliminar un kit (soft delete)
      async delete(req, res) {
        try {
          const { id } = req.params;
          const kitEliminado = await kitService.delete(id);
    
          if (!kitEliminado) { // Corregido de 'kitoEliminado' a 'kitEliminado'
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
          errorHandler(res, error);
        }
      }
} 

export default kitController;
