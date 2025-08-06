import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es requerido'],
        trim: true
    },
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
    inventario: {
        type: Array,
        required: false
    }
}, {
    timestamps: true
})

// Middleware para encriptar contraseña antes de guardar
UserSchema.pre('save', async function(next) {
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
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

// Método para obtener usuario sin contraseña
UserSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password
    return user
}

export default mongoose.model('User', UserSchema) 


