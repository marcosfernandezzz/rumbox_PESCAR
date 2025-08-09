import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const SaleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "El usuario es requerido"]
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "El producto es requerido"]
        },
        quantity: {
            type: Number,
            required: [true, "La cantidad es requerida"],
            min: [1, "La cantidad debe ser al menos 1"]
        }
    }],
    total: {
        type: Number,
        required: [true, "El total es requerido"],
        min: [0, "El total no puede ser negativo"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

const SaleModel = mongoose.model('Sale', SaleSchema);

export default SaleModel;
