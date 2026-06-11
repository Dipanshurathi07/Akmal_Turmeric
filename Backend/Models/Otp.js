const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optSchema = new Schema({
  email : {
    type : String,
    required : true,
    trim : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : false
  },
  otp : {
    type : String,
    required : true
  },
  purpose: {
    type: String,
    enum: ["registration", "password-reset"],
    default: "registration"
  },
  isVerified : {
    type : Boolean,
    default : false
  }
},{
  timestamps : true
});
module.exports = mongoose.model("Otp",optSchema);