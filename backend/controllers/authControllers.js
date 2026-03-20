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

    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // ✅ Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate verification token
    const token = crypto.randomBytes(32).toString("hex");

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: Date.now() + 3600000, // 1 hour
      isVerified: false
    });

    // ✅ Verification link
    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    // ✅ Send email (safe handling)
    try {
      await transporter.sendMail({
        to: email,
        subject: "Verify Your Email",
        html: `
          <h2>Email Verification</h2>
          <p>Click the link below to verify your account:</p>
          <a href="${verifyLink}">Verify Email</a>
        `
      });
    } catch (err) {
      console.error("❌ Email sending failed:", err.message);
      // Don't fail registration because of email
    }

    return res.status(201).json({
      message: "User registered successfully. Please verify your email."
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error during registration"
    });
  }
};


// ================== VERIFY EMAIL ==================
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Token is missing"
      });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // ✅ Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return res.status(500).json({
      message: "Server error during email verification"
    });
  }
};


// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // ✅ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ✅ Block unverified users
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure in prod
      sameSite: "strict"
    });

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error during login"
    });
  }
};