const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoute = require('./Routes/UserRoute');
const adminRoute = require('./Routes/AdminRoute');

connectDB();

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/admin",adminRoute);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});