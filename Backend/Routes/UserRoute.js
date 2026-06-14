const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createHmac } = require("node:crypto");
const dotenv = require('dotenv');
const { otpGenerator, htmlTemplate } = require("../Utils/otpandHtml");
const { sendEmail } = require("../Services/email");
const Otp = require("../Models/Otp");
const { protect } = require("../MiddleWare/Auth");
const {admin} = require("../MiddleWare/Auth");


dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    const getUser = await User.findOne({ email });

    if (getUser) {
      return res.status(400).json({
        Message: "Email already exists"
      });
    }

    const verifiedOtp = await Otp.findOne({
      email,
      purpose: "registration",
      isVerified: true
    });

    if (!verifiedOtp) {
      return res.status(400).json({
        Message: "Email must be verified before creating an account"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      Contact: contact,
      verified: true
    });

    await Otp.deleteMany({ email, purpose: "registration" });

    const AccessToken = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "15m"});
    const RefreshToken = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "7d"});
    res.cookie("refreshToken",RefreshToken,{
      httpOnly : true,
      secure : false,
      sameSite : "strict",
      path: "/",
      maxAge : 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      Message: "User registration successfully",
      AccessToken: AccessToken
    });

  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
});

router.post("/send-registration-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ Message: "Email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ Message: "Email already exists" });
    }

    await Otp.deleteMany({ email, purpose: "registration" });

    const otpCode = otpGenerator();
    const hashOtp = createHmac('sha256', process.env.SECRET_KEY)
      .update(otpCode)
      .digest('hex');

    await Otp.create({
      email,
      otp: hashOtp,
      purpose: "registration"
    });

    const html = htmlTemplate(otpCode);
    await sendEmail(email, "Email Verification", `Your OTP code is ${otpCode}`, html);

    return res.status(200).json({ Message: "Registration OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
});

router.post("/verify-registration-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ Message: "Email and OTP are required" });
    }

    const hashOtp = createHmac('sha256', process.env.SECRET_KEY)
      .update(otp)
      .digest('hex');

    const otpRecord = await Otp.findOne({
      email,
      otp: hashOtp,
      purpose: "registration"
    });

    if (!otpRecord) {
      return res.status(400).json({ Message: "Invalid OTP" });
    }

    otpRecord.isVerified = true;
    await otpRecord.save();

    return res.status(200).json({ Message: "otp verified" });
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        Message: "User not found"
      });
    }
    if(!user.verified){
      return res.status(401).json({
        Message: "Please verify your email to login"
      });
    }

    const secret = process.env.SECRET_KEY;

    const hashPassword = createHmac("sha256", secret)
      .update(password)
      .digest("hex");

    if (hashPassword !== user.password) {
      return res.status(401).json({
        Message: "Invalid credentials"
      });
    }
    const AccessToken = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "15m"});
    const RefreshToken = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn : "7d"});
    res.cookie("refreshToken",RefreshToken,{
       httpOnly : true,
       secure : false,
       sameSite : "strict",
       path: "/",
       maxAge : 7 * 24 * 60 * 60 * 1000 //this is 7 days
        });

    res.status(200).json({
      Message: "Login successful",
      AccessToken: AccessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ Message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }
    if (!user.verified) {
      return res.status(401).json({ Message: "Please verify your email before resetting password" });
    }

    await Otp.deleteMany({ email });

    const otpCode = otpGenerator();
    const hashOtp = createHmac("sha256", process.env.SECRET_KEY)
      .update(otpCode)
      .digest("hex");

    await Otp.create({
      email,
      user: user._id,
      otp: hashOtp,
      isVerified: false
    });

    const html = htmlTemplate(otpCode);
    await sendEmail(email, "Password Reset OTP", `Your OTP code for password reset is ${otpCode}`, html);

    res.status(200).json({
      Message: "OTP sent to email for password reset"
    });
  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
});
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ Message: "Email and OTP are required" });
    }

    const hashOtp = createHmac('sha256', process.env.SECRET_KEY)
                    .update(otp)
                    .digest('hex');
    const otpRecord = await Otp.findOne({ email, otp: hashOtp });
    if (!otpRecord) {
      return res.status(400).json({ Message: "Invalid OTP" });
    }

    otpRecord.isVerified = true;
    await otpRecord.save();

    return res.status(200).json({ Message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
})

router.post("/verify-email", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ Message: "Email and OTP are required" });
    }

    const hashOtp = createHmac('sha256', process.env.SECRET_KEY)
                    .update(otp)
                    .digest('hex');
    const otpRecord = await Otp.findOne({ email, otp: hashOtp });
    if (!otpRecord) {
      return res.status(400).json({ Message: "Invalid OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }

    user.verified = true;
    await user.save();

    otpRecord.isVerified = true;
    await otpRecord.save();

    return res.status(200).json({ Message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
})

router.post("/password-reset", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(400).json({ Message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }

    const otpRecord = await Otp.findOne({ email, isVerified: true });
    if (!otpRecord) {
      return res.status(401).json({ Message: "OTP not verified" });
    }

    // Assign plain password here — the User model's pre-save hook will hash it once.
    user.password = password;
    await user.save();
    await Otp.deleteMany({ email });
    req.cookies.refreshToken = ""; // Clear the refresh token cookie on password reset
    return res.status(200).json({ Message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
})

router.post("/refresh", async (req, res) => {
  try {
    const resfreshToken = req.cookies.refreshToken;
    if (!resfreshToken) {
      return res.status(401).json({
        Message: "Unauthorized"
      });
    }
    const decoded = jwt.verify(resfreshToken, process.env.JWT_SECRET);
    const AccessToken = jwt.sign({id : decoded.id},process.env.JWT_SECRET,{expiresIn : "15m"});
    const RefreshToken = jwt.sign({id : decoded.id},process.env.JWT_SECRET,{expiresIn : "7d"});
    res.cookie("refreshToken",RefreshToken,{
      httpOnly : true,
      secure : false,
      sameSite : "strict",
      path: "/",
      maxAge : 7 * 24 * 60 * 60 * 1000 //this is 7 days
    });
    res.status(200).json({
      AccessToken: AccessToken
    });
  } catch (error) {
    res.status(401).json({
      Message: "Invalid refresh token"
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json({ Message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ "Server Error": error.message });
  }
});

router.get("/me",protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
});
router.get("/:id",protect,admin,async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      "Server Error": error.message
    });
  }
});

//Logout part is remainning i have to understand that how i can logout

module.exports = router;