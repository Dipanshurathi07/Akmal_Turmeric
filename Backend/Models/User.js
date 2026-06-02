const mongoose = require("mongoose");
const { createHmac } = require("node:crypto");
const dotenv = require('dotenv');
dotenv.config();

const Schema = mongoose.Schema;

const userSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Invalid email"]
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer"
  }
},
{
  timestamps: true
}
);

// Hash password before save using crypto
userSchema.pre("save", function() {
  if (!this.isModified("password")) {
    return;
  }

  const secret = process.env.SECRET_KEY;

  this.password = createHmac("sha256", secret)
    .update(this.password)
    .digest("hex");
});

module.exports = mongoose.model("User", userSchema);