const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected!'));

const seedUsers = async () => {
  try {
    await User.deleteMany({}); // Clear existing users
    const users = await User.create({
      name : "Akmal",
      email : "akmal@example.com",
      role : "admin",
      password : "123456789"
    })
    await users.save();
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}
seedUsers();
