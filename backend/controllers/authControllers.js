const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Resend } = require("resend");

// ================== RESEND SETUP ==================
const resend = new Resend(process.env.RESEND_API_KEY);


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

    // ✅ Hash password (trim for safety)
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // ✅ Generate token
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

    // ✅ Send email via Resend
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify Your Email",
        html: `
          <h2>Email Verification</h2>
          <p>Click the link below to verify your account:</p>
          <a href="${verifyLink}">Verify Email</a>
        `
      });

      console.log("✅ Email sent via Resend");

    } catch (emailError) {
      console.error("❌ Email failed:", emailError.message);
      // Do NOT break registration
    }

    return res.status(201).json({
      message: "User registered successfully. Please verify your email."
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error"
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

    // ✅ Mark verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({
      message: "Server error during verification"
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

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 🚫 Block unverified users
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    // ✅ Compare password (trim for safety)
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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