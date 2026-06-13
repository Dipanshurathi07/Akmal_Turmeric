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
  },

  minOrder: {
    type: Number,
    default: 1
  },

  moq: {
    type: Number,
    default: 1
  },

  unit: {
    type: String,
    trim: true,
    default: 'kg'
  },

  productType: {
    type: String,
    trim: true
  },

  quality: {
    type: String,
    trim: true
  },

  productGrade: {
    type: String,
    trim: true
  },

  packaging: {
    type: String,
    trim: true
  },

  packagingSize: {
    type: String,
    trim: true
  },

  bulkPrice: {
    type: Number,
    default: 0
  },

  wholesaleDiscount: {
    type: Number,
    default: 0
  },

  leadTime: {
    type: String,
    trim: true
  },

  exportQuality: {
    type: String,
    trim: true
  },

  availability: {
    type: String,
    trim: true,
    default: 'In stock'
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);