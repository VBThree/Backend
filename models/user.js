const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: String,
    email: {
        type:String,
        unique: true
    },
    password: String,
    phone: {
        type: String,
        unique: true
    },
    birthday: Date,
    rating: Number
})

module.exports = mongoose.model("User", userSchema)