const express = require('express');
const router = express.Router();
const Checkout = require('../Models/Checkout');
const Product = require('../Models/Products');
const { protect, admin } = require('../MiddleWare/Auth');

router.post('/create', protect, async (req, res) => {
  try {
    const userId = req.user?._id;
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!userId) {
      return res.status(401).json({ Message: 'Unauthorized' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ Message: 'Items are required' });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ Message: 'shippingAddress and paymentMethod are required' });
    }

    const checkoutItems = [];
    let totalItems = 0;
    let totalAmount = 0;

    for (const item of items) {
      const { productId, quantity = 1 } = item;
      if (!productId || quantity < 1) {
        return res.status(400).json({ Message: 'Each item needs a valid productId and quantity' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ Message: `Product not found: ${productId}` });
      }

      const price = product.price;
      totalItems += quantity;
      totalAmount += price * quantity;
      checkoutItems.push({ product: productId, quantity, price });
    }

    const checkout = new Checkout({
      user: userId,
      items: checkoutItems,
      totalItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await checkout.save();
    await checkout.populate('items.product');

    return res.status(201).json({ Message: 'Checkout created successfully', checkout });
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

router.get('/user', protect, async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ Message: 'Unauthorized' });
    }

    const checkouts = await Checkout.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });
    return res.status(200).json(checkouts);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

router.get('/:checkoutId', protect, async (req, res) => {
  try {
    const { checkoutId } = req.params;
    const checkout = await Checkout.findById(checkoutId).populate('items.product');

    if (!checkout) {
      return res.status(404).json({ Message: 'Checkout order not found' });
    }

    if (checkout.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ Message: 'Forbidden' });
    }

    return res.status(200).json(checkout);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

router.get('/', protect, admin, async (req, res) => {
  try {
    const checkouts = await Checkout.find().populate('items.product').sort({ createdAt: -1 });
    return res.status(200).json(checkouts);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
});

module.exports = router;
