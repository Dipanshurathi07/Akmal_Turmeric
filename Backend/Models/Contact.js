const express= require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name  : {
    type:String,
    required:true,
    trim:true
  },
  email : {
    type:String,
    required:true,
    trim:true,
    match: [/.+\@.+\..+/, "Invalid email"]
  },
  phoneNumber : {
    type : Number,
    required : true
  },
  message : {
    type : String,
    required : true,
    trim : true
  }
},{
  timestamps : true
});
module.exports = mongoose.model("Contact",contactSchema);