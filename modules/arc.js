const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const arcSchema = new Schema({
  arcName: String,
  captainName: String,
  arcType: String,
});

module.exports = mongoose.model("Arc", arcSchema);
