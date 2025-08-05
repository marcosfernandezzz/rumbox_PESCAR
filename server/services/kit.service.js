import Kit from "../models/kits.model.js";

const KitService = {
  async getAll() {
    try {
      const kit = await Kit.find({ activo: true });
      return kit;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getByID(id) {
    try {
      const kit = await Kit.findById(id);
      return kit;
    } catch (error) {
      throw new Error(error);
    }
  },

  async create(kitData) {
    try {
      const nuevoKit = new kit(kitData);
      const kitGuardado = await nuevoKit.save();
      return kitGuardado;
    } catch (error) {
      throw new Error(error);
    }
  },

  async update(id, pkitData) {
    try {
      const kitActualizado = await Kit.findByIdAndUpdate(id, kitData, {
        new: true,
        runValidators: true,
      });
      return kitActualizado;
    } catch (error) {
      throw new Error(error);
    }
  },

  async delete(id) {
    try {
      // Soft delete - solo cambia el estado a inactivo
      const kitEliminado = await Kit.findByIdAndUpdate(
        id,
        { activo: false },
        { new: true }
      );
      return kitEliminado;
    } catch (error) {
      throw new Error(error);
    }
  },
};


export default KitService