const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Ordina per data di creazione (ultimo prodotto in cima)
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res) => {
    try{
        const {name} = req.body;
        if (!name){
            return res.status(400).json({error:'Name required'});
        }
        const product = new Product({name});
        await product.save();
        res.status(201).json(product);
    } catch (error){
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {name} = req.body;
        const product = await Product.findByIdAndUpdate(id, {name}, {new:true});
        if (!product){
            return res.status(404).json({error: 'Product not found'})
        }
        await product.save();
        res.status(200).json(product);
    } catch (error){
        next(error);
    }
};

exports.deleteProduct = async(req, res, next) => {
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(400).json({error:'Product not found'})
        }
        res.status(200).json({message:'Product deleted succesfully'})
    }catch(error){
        next(error)
    }
};