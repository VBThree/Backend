const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema({
  createdBy: mongoose.SchemaTypes.ObjectId,
  date: Date,
  type: {
    type: String,
    enum: ["Lost", "Food", "Ownership", "Vaccination"],
  },
  animalId: mongoose.SchemaTypes.ObjectId,
  animalType: {
    type: String,
    enum: ["Cat", "Dog", "Other"],
  },
  description: String,
  location: {
    type: String,
    coordinates: [Number],
  },
  attendantId: mongoose.SchemaTypes.ObjectId,
  status: {
    type: String,
    enum: ["Active", "inProgress", "Done"],
  },
});

// adSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Ad", adSchema);
