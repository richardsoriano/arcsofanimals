const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  name: String,
  dietType: String,
  numberOfAnimals: Number,
  arcID: String,
});

module.exports = mongoose.model("Animal", animalSchema);
