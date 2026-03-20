const express = require("express");
const router = express.Router();

const { register, login, verifyEmail } = require("../controllers/authControllers");

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail); // ✅ ADD THIS
module.exports = router;