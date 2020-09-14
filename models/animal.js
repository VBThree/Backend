const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({ 
    name: String,
    age: Number,
    type: {
        type: String,
        enum: ["Cat", "Dog", "Other"]
    },
    breed: String,
})

module.exports = mongoose.model("Animal", animalSchema)