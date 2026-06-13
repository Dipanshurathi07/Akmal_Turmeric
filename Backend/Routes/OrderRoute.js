const express = require('express');
const router = express.Router();

const Order = require('../Models/Order');
const Product = require('../Models/Products');
const Cart = require('../Models/Cart');

const { protect, admin } = require('../Middleware/Auth');

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(
    Math.random() * 9000 + 1000
  )}`;
};

// CREATE ORDER
router.post('/create', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      items,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        Message: 'Items are required',
      });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        Message:
          'Shipping address and payment method are required',
      });
    }

    let totalItems = 0;
    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(
        item.productId
      );

      if (!product) {
        return res.status(404).json({
          Message: `Product not found: ${item.productId}`,
        });
      }

      const quantity = item.quantity || 1;

      totalItems += quantity;
      totalAmount += product.price * quantity;

      orderItems.push({
        product: product._id,
        quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      user: userId,
      orderNumber: generateOrderNumber(),

      items: orderItems,

      totalItems,
      totalAmount,

      shippingAddress,
      paymentMethod,

      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    await order.populate('items.product');

    // Clear Cart
    await Cart.findOneAndUpdate(
      { user: userId },
      {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }
    );

    return res.status(201).json({
      Message: 'Order created successfully',
      order,
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
});

// CURRENT USER ORDERS
router.get('/user', protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate('items.product')
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
});

// GET SINGLE ORDER
router.get('/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.orderId
    )
      .populate('items.product')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        Message: 'Order not found',
      });
    }

    if (
      order.user._id.toString() !==
        req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        Message: 'Forbidden',
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
});

// ADMIN - GET ALL ORDERS
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
});

// ADMIN - UPDATE STATUS
router.put(
  '/status/:orderId',
  protect,
  admin,
  async (req, res) => {
    try {
      const { orderStatus } = req.body;

      const validStatuses = [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ];

      if (
        !validStatuses.includes(orderStatus)
      ) {
        return res.status(400).json({
          Message: 'Invalid order status',
        });
      }

      const order =
        await Order.findById(
          req.params.orderId
        );

      if (!order) {
        return res.status(404).json({
          Message: 'Order not found',
        });
      }

      order.orderStatus = orderStatus;

      if (orderStatus === 'delivered') {
        order.deliveredAt = new Date();
      }

      if (orderStatus === 'cancelled') {
        order.cancelledAt = new Date();
      }

      await order.save();

      return res.status(200).json({
        Message:
          'Order status updated successfully',
        order,
      });
    } catch (error) {
      return res.status(500).json({
        Message: error.message,
      });
    }
  }
);

// ADMIN - DELETE ORDER
router.delete(
  '/:orderId',
  protect,
  admin,
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.orderId
        );

      if (!order) {
        return res.status(404).json({
          Message: 'Order not found',
        });
      }

      await Order.findByIdAndDelete(
        req.params.orderId
      );

      return res.status(200).json({
        Message:
          'Order deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        Message: error.message,
      });
    }
  }
);

module.exports = router;
