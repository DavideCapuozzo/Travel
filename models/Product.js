const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('Product', productSchema);
