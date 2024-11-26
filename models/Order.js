const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definizione dello schema
const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true, // Ogni ordine deve avere almeno un prodotto
            },
        ],
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true, // Ogni ordine deve avere almeno un prodotto
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now, // Imposta automaticamente la data di creazione
        },
    },
    {
        timestamps: true, // Aggiunge automaticamente campi "createdAt" e "updatedAt"
    }
);

module.exports = mongoose.model('Order', OrderSchema);
