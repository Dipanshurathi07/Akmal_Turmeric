const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');
const Product = require('../Models/Products');
const {admin,protect} = require("../MiddleWare/Auth");

// Get cart for a user
router.get('/',protect, async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ Message: 'Cart is empty', cart: { items: [], totalItems: 0, totalPrice: 0 } });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Add item to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ Message: 'productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ Message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, price: product.price }],
      });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    await cart.populate('items.product');

    return res.status(201).json({ Message: 'Product added to cart', cart });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Update cart item quantity
router.put('/update/:productId', protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;

    if (quantity == null) {
      return res.status(400).json({ Message: 'quantity is required' });
    }

    if (quantity < 1) {
      return res.status(400).json({ Message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ Message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ Message: 'Product not found in cart' });
    }

    item.quantity = quantity;
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({ Message: 'Cart updated', cart });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ Message: 'Cart not found' });
    }

    const beforeCount = cart.items.length;
    cart.items = cart.items.filter(item => item.product?.toString() !== productId);

    if (cart.items.length === beforeCount) {
      return res.status(404).json({ Message: 'Product not found in cart' });
    }

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({ Message: 'Product removed from cart', cart });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

// Clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ Message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();

    return res.status(200).json({ Message: 'Cart cleared', cart });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

module.exports = router;
