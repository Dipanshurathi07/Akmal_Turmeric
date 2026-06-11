const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req,res,next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //fetch data
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
}
const admin = async (req,res,next) => {
  try {
    if(req.user && req.user.role === "admin"){
      next();
    }    else{
      res.status(403).json({message: "Forbidden"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
}
module.exports = {
  protect,
  admin
}