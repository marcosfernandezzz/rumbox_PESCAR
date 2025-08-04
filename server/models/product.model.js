import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de producto es requerido"],
        trim: true,
        maxLength: [50, "El nombre de producto no puede exceder los 50 caracteres"],
        minLength: [3, "El nombre de producto debe tener al menos 3 caracteres"],
    },
    precio: {
        type: Number,
        required: [true, "El precio del producto es requerido"],
        min: [0, "El precio no puede ser negativo"],
        validate: {
            validator: Number.isInteger,
            message: "El precio debe ser un numero entero"
        }
    },
    precioDescuento: {
        type: Number,
        required: [false, "El precio del producto es requerido"],
        min: [0, "El precio no puede ser negativo"],
        validate: {
            validator: Number.isInteger,
            message: "El precio debe ser un numero entero"
        }
    },
    descuento: {
        type: Number,
        required: false,
        min: [0, "El descuento no puede ser negativo"],
        validate: {
            validator: Number.isInteger,
            message: "El descuento debe ser un numero entero"
        }
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del producto es requerida"],
        trim: true,
        maxLength: [200, "La descripción no puede exceder los 200 caracteres"],
        minLength: [10, "La descripción debe tener al menos 10 caracteres"],
    },
    categoria: {
        type: String,
        required: [true, "La categoría del producto es requerida"],
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
    image: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true
    }
})

// Middleware para formatear el nombre del producto antes de guardar
ProductSchema.pre('save', function(next) {
    if (this.isModified('nombre')) {
        this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLowerCase();
    }
    next();
})

export default mongoose.model('Product', ProductSchema);