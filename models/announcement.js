const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  createdBy: mongoose.SchemaTypes.ObjectId,
  date: Date,
  type: {
    type: String,
    enum: ["Lost", "Food", "Ownership", "Vaccination"],
  },
  species: {
    type: String,
    enum: ["Cat", "Dog", "Other"]
  },
  gender: {
    type: String,
    enum: ["Female", "Male"]
  },
  breed: String,
  age: Number,
  description: String,
  status: {
    type: String,
    enum: ["Active", "inProgress", "Done"],
  },
  attendantId: mongoose.SchemaTypes.ObjectId,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  photo: String
});

announcementSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Announcement", announcementSchema);
