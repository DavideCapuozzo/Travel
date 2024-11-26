const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true, 
            },
        ],
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true, 
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', OrderSchema);
