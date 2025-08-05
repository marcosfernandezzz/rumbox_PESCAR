import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const KitSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de kit es requerido"],
        trim: true,
        maxLength: [50, "El nombre del kit no puede exceder los 50 caracteres"],
        minLength: [3, "El nombre de kit debe tener al menos 3 caracteres"],
    },
    precio: {
        type: Number,
        required: [true, "El precio del kit es requerido"],
        min: [0, "El precio no puede ser negativo"],
    },
    
    descripcion: {
        type: String,
        required: [true, "La descripción del kit es requerida"],
        trim: true,
        maxLength: [300, "La descripción no puede exceder los 300 caracteres"],
        minLength: [10, "La descripción debe tener al menos 10 caracteres"],
    },
    categoria: {
        type: String,
        required: [true, "La categoría del kit es requerida"],
        enum: ["Nieve", "Playa", "Montaña"],
        default: "Nieve",
        trim: true,
        maxLength: [7, "La categoría no puede exceder los 7 caracteres"],
        minLength: [5, "La categoría debe tener al menos 5 caracteres"],
    },
    caracteristicaUno: {
        type: String ,
        required: false,
        trim: true,
        maxLenght:[20, "La caracteristica no puede exceder de los 20 caracteres"]
    },
    caracteristicaDos: {
        type: String ,
        required: false,
        trim: true,
        maxLenght:[20, "La caracteristica no puede exceder de los 20 caracteres"]
    },
    caracteristicaTres: {
        type: String ,
        required: false,
        trim: true,
        maxLenght:[20, "La caracteristica no puede exceder de los 20 caracteres"]
    },
    productosIncluidos: {
        type: Array,
        required: true,
        trim: true,
        minLength: [2, 'El kit debe tener al menos 2 productos']
    },
    image: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true
    }
})

// Middleware para formatear el nombre del Kit antes de guardar
KitSchema.pre('save', function(next) {
    if (this.isModified('nombre')) {
        this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLowerCase();
    }
    next();
})

export default mongoose.model('Kit', KitSchema);