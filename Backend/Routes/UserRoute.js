const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User');
const router = express.Router();
const { createHmac } = require("node:crypto");
const dotenv = require('dotenv');
dotenv.config();

router.post("/register",async(req,res)=>{
  try {
    const {name,email,password,role} = req.body;
    const getUser = await User.findOne({email});
    if(getUser){
      return res.status(400).json({"Message" : "Email already exists"});
    }else{
    const user = await User.create({name,email,password,role});
    await user.save();
    res.status(201).json({"Message" : "User registered successfully"});
    }
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
});
router.post("/login",async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
      const secret = process.env.SECRET_KEY;
      const hashPassword = createHmac('sha256', secret)
                         .update(password)
                         .digest('hex');
      if(hashPassword === user.password){
        res.status(200).json({"Message" : "Login successful"});
      }else{
        res.status(401).json({"Message" : "Invalid credentials"});
      }
    }else{
      res.status(404).json({"Message" : "User not found"});
    }
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
});

module.exports = router;