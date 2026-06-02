const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../Models/User');
const router = express.Router();
dotenv.config();

router.get("/",async(req,res)=>{
  try {
    const users = await User.find({});
    if(users.length > 0){
      res.status(200).json({"Message" : users});
    }else{
      res.status(404).json({"Message" : "No users found"});
    }
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
})
router.post("/",async(req,res)=>{
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
router.put("/:id",async(req,res)=>{
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
router.delete("/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    await findByIdAndDelete(id);
    res.status(200).json({"Message" : "User deleted successfully"});
  } catch (error) {
    res.status(500).json({"Server Error" : error.message});
  }
})
module.exports = router;