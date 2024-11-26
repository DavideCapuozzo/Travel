const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    try{
        const user = await User.find().sort({ createdAt: -1 });
        res.status(200).json(user)
    } catch(error) {
        next(error);
    }
};

exports.creatUser = async (req, res) => {
    try{
        const { name } = req.body
        if (!name){
            return res.status(400).json({error:'Name required'});
        }
        const { surname } = req.body
        if (!surname){
            return res.status(400).json({error:'Surname required'});
        }
        const { email } = req.body
        if (!email){
            return res.status(400).json({error:'Email required'});
        }
        const user = new User({name, surname, email});
        await user.save();
        res.status(201).json(user);
    } catch (error){
        next(error);
    }
};

exports.updateUser = async(req, res, next) => {
    try{
        const{id} = req.params;
        const{name} = req.body;
        const{surname} = req.body;
        const {email} = req.body;
        const user = await User.findByIdAndUpdate(
            id,
            {
                name,
                surname,
                email
            },
            {new:true}
        );
        if(!user){
            return res.status(404).json({error:'User not found'})
        }
        await user.save();
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
};

exports.delateUser = async (req, res) => {
    try{
        const{id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({error: 'User not found'})
        }
        res.status(200).json({message:'User delate succesfully'})
    }catch(error){
        next(error)
    }
};