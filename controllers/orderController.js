
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'products',
                select: 'name -_id',
            })
            .populate({
                path: 'user', 
                select: 'name surname -_id',
            })
            .sort({ createdAt: -1 }); 

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};


exports.createOrder = async (req, res, next) => {
    try {
        const { products, user } = req.body;

        // Controlla se l'utente esiste
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('userExists')
        // Controlla se i prodotti esistono
        const productCheckPromises = products.map(productId => Product.findById(productId));
        const productResults = await Promise.all(productCheckPromises);

        // Identifica eventuali prodotti mancanti
        const missingProducts = productResults
            .map((product, index) => (!product ? products[index] : null))
            .filter(product => product !== null);

        if (missingProducts.length > 0) {
            return res.status(404).json({
                error: 'Some products not found',
                missingProducts,
            });
        }

        // Crea l'ordine
        const order = new Order({ products, user });
        await order.save();

        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: 'products',
                select: 'name',
            })
            .populate({
                path: 'user',
                select: 'name surname',
            });

        res.status(201).json(populatedOrder);
    } catch (error) {
        next(error);
    }
};

exports.filterOrders = async (req, res, next) => {
    try {
        const { startDate, endDate, productId } = req.query;

        // Se non ci sono filtri, ritorna un errore
        if (!startDate && !endDate && !productId) {
            return res.status(400).json({
                error: 'At least one filter (startDate, endDate, or productId) must be provided.',
            });
        }

        // Costruzione dinamica del filtro
        const filter = {};

        // Filtra per data di creazione
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate); // Data inizio
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate); // Data fine
            }
        }

        // Filtra per prodotto contenuto nell'array
        if (productId) {
            filter.products = { $in: [new mongoose.Types.ObjectId(productId)] }; // Correzione: utilizza `new`
        }

        // Esegue la query con il filtro
        const orders = await Order.find(filter)
            .populate('products') // Popola i dettagli dei prodotti
            .populate('user') // Popola i dettagli dell'utente
            .sort({ createdAt: -1 }); // Ordine discendente per data di creazione

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};


exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // ID dell'ordine da aggiornare
        const { products, user } = req.body;

        // Trova l'ordine esistente
        const existingOrder = await Order.findById(id);
        if (!existingOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Controlla se l'utente esiste
        if (user) {
            const userExists = await User.findById(user);
            if (!userExists) {
                return res.status(404).json({ error: 'User not found' });
            }
        }

        // Controlla se i prodotti esistono
        if (products && products.length > 0) {
            const productCheckPromises = products.map(productId => Product.findById(productId));
            const productResults = await Promise.all(productCheckPromises);

            // Identifica eventuali prodotti mancanti
            const missingProducts = productResults
                .map((product, index) => (!product ? products[index] : null))
                .filter(product => product !== null);

            if (missingProducts.length > 0) {
                return res.status(404).json({
                    error: 'Some products not found',
                    missingProducts,
                });
            }
        }

        // Aggiorna l'ordine
        if (products) existingOrder.products = products;
        if (user) existingOrder.user = user;

        await existingOrder.save();

        // Popola i dettagli aggiornati
        const updatedOrder = await Order.findById(id)
            .populate('products', 'name')
            .populate('user', 'name surname');

        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};


exports.delateUser = async (req, res) => {
    try{
        const{id} = req.params;
        const orders = await Order.findByIdAndDelete(id);
        if(!orders){
            return res.status(400).json({error: 'Orders not found'})
        }
        res.status(200).json({message:'Orders delate succesfully'})
    }catch(error){
        next(error)
    }
}; 