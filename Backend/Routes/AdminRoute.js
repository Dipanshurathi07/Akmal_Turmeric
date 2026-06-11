const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../Models/User');
const router = express.Router();
const {admin,protect} = require("../MiddleWare/Auth");
const jwt = require("jsonwebtoken");
dotenv.config();

router.get("/",protect,admin,async(req,res)=>{
  try {
    const users = await User.find({});
    if(users.length > 0){
      res.status(200).json(users);
    }else{
      res.status(404).json({"Message" : "No users found"});
    }
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
})
router.post("/",protect,admin,async(req,res)=>{
  try {
    const {name,email,password,role} = req.body;
    const getUser = await User.findOne({email});
    if(getUser){
      return res.status(400).json({"Message" : "Email already exists"});
    }else{
    const user = await User.create({name,email,password,role});
    const AccessToken = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "15m"});
    const RefreshToken = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "7d"});
    res.cookie("refreshToken",RefreshToken,{
      httpOnly : true,
      secure : true,
      sameSite : "strict",
      maxAge : 7 * 24 * 60 * 60 * 1000 //this is 7 days
    });

    res.status(201).json({"Message" : "User registered successfully", "AccessToken" : AccessToken});
    }
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
});
router.put("/:id",protect,admin,async(req,res)=>{
  try {
    const {id} = req.params;
    const {name,email,password,role} = req.body;
    const user = await User.findByIdAndUpdate(id,{name,email,password,role},{new : true});
    if(user){
      res.status(200).json({"Message" : "User updated successfully"});
    }else{
      res.status(404).json({"Message" : "User not found"});
    }
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
});
router.delete("/:id",protect,admin,async(req,res)=>{
  try {
    const {id}=req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({"Message" : "User deleted successfully"});
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
})
module.exports = router;