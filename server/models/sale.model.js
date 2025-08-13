import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'products.itemType'
            },
            itemType: {
                type: String,
                required: true,
                enum: ['Product', 'Kit']
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            priceAtSale: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
