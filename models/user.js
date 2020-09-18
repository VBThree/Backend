const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: {
        type: String,
        required: true        
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    rating: Number,
    resetToken: {
        type: String,
        default: undefined
    },
    expiryDate: {
        type: Date,
        default: undefined
    },
    photo: String
})

module.exports = mongoose.model("User", userSchema)