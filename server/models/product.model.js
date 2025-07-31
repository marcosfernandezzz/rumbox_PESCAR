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
            message: "El precio debe ser un número entero"
        }
    },
    descripcion:{
        type: 
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
    url: {
        type: String,
        required: false,
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