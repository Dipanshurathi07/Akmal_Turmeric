const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoute = require('./Routes/UserRoute');
const adminRoute = require('./Routes/AdminRoute');
const cartRoute = require('./Routes/CartRoute');
const checkoutRoute = require('./Routes/CheckoutRoute');
const contactRoute = require('./Routes/ContactRoute');
const orderRoute = require('./Routes/OrderRoute');
const productsRoute = require('./Routes/ProductsRoute');
const cookieParser = require('cookie-parser');
const cors = require("cors");

connectDB();

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Allow CORS for local dev servers (echo request origin)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      // allow all localhost origins (dev) and add other allowed origins here
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use("/api/users",userRoute);
app.use("/api/admin",adminRoute);
app.use("/api/cart",cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/contact", contactRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products", productsRoute);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});