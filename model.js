const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
});

module.exports = mongoose.model("Blog", blogSchema);
