const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  image: {
    url: {
      type: String
    },
    filename: {
      type: String
    }
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);