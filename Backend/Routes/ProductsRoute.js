const express = require('express');
const Product = require('../Models/Products');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Get single product by ID
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ Message: 'Product not found' });
    }
    console.log("Product found:", product);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ Message: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      description,
      category,
      stock,
      minOrder,
      moq,
      unit,
      productType,
      quality,
      productGrade,
      packaging,
      packagingSize,
      bulkPrice,
      wholesaleDiscount,
      leadTime,
      exportQuality,
      availability
    } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ Message: 'name, price, description, and category are required' });
    }

    const newProduct = await Product.create({
      name,
      image,
      price,
      description,
      category,
      stock: stock || 0,
      minOrder: minOrder || moq || 1,
      moq: moq || minOrder || 1,
      unit: unit || 'kg',
      productType,
      quality,
      productGrade: productGrade || quality,
      packaging,
      packagingSize: packagingSize || packaging,
      bulkPrice: bulkPrice || price,
      wholesaleDiscount: wholesaleDiscount || 0,
      leadTime,
      exportQuality,
      availability: availability || 'In stock'
    });

    return res.status(201).json({ Message: 'Product created successfully', product: newProduct });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Update a product
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ Message: 'Product not found' });
    }

    return res.status(200).json({ Message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ Message: 'Product not found' });
    }

    return res.status(200).json({ Message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

module.exports = router;
