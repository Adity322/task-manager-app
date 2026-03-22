const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// ================== EMAIL TRANSPORTER ==================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // token
    const token = crypto.randomBytes(32).toString("hex");

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: Date.now() + 3600000,
      isVerified: false
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    // 🔥 SAFE EMAIL SEND
    try {
      await transporter.sendMail({
        to: email,
        subject: "Verify Your Email",
        html: `
          <h2>Email Verification</h2>
          <p>Click below:</p>
          <a href="${verifyLink}">Verify Email</a>
        `
      });

      console.log("✅ Email sent successfully");

    } catch (emailError) {
      console.error("❌ Email failed:", emailError.message);
      // DO NOT FAIL REGISTRATION
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