const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name too short"],
        maxlength: [50, "Name too long"],
        match: [/^[a-zA-Z\s'-]+$/, 'Invalid name characters']
    },
    surname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name too short"],
        maxlength: [50, "Name too long"],
        match: [/^[a-zA-Z\s'-]+$/, 'Invalid name characters']
    },
    email:{
        type: String,
        unique: true,
		required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    }
});

module.exports = mongoose.model('User', userSchema);