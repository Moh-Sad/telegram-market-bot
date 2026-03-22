const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  location: String,
  condition: String,
  size: String,
  description: String,
  phone: String,
  photo: String,
});

module.exports = mongoose.model("Product", productSchema);