const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// ================== EMAIL TRANSPORTER ==================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});


// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: Date.now() + 3600000 // 1 hour
    });

    // verification link
    const verifyLink = `https://task-manager-app-six-zeta.vercel.app/verify-email?token=${token}`;

    // send email
    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verifyLink}">Verify Email</a>
      `
    });

    res.status(201).json({
      message: "User registered. Please verify your email."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// ================== VERIFY EMAIL ==================
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // mark as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    if (!user.isVerified){
      returnres.status(403).json({
        message:"Please verify your email first"
      });
    }

    // 🚫 block unverified users
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};