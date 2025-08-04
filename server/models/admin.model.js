import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const AdminSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'El email es requerido'], 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es requerida'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

// Middleware para encriptar contraseña antes de guardar
AdminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// Método para comparar contraseñas
AdminSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

// Método para obtener admin sin contraseña
AdminSchema.methods.toJSON = function() {
    const admin = this.toObject()
    delete admin.password
    return admin
}

export default mongoose.model('Admin', AdminSchema) 