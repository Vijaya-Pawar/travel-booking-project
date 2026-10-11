const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const result = require("../../utils/result");

const router = express.Router();


// ================= FORGOT PASSWORD =================
// POST http://localhost:5000/api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send(result.error(res, "User not found"));
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Optional: send email instead of returning token (BEST PRACTICE)
    return res.status(200).send(
      result.success(res, { resetToken }, "Reset token generated")
    );

  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= RESET PASSWORD =================
// POST http://localhost:5000/api/auth/reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send(result.error(res, "Password must be at least 6 characters"));
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send(result.error(res, "User not found"));
    }

    // hash password (SECURE)
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .send(result.success(res, null, "Password reset successful"));

  } catch (error) {
    return res
      .status(400)
      .send(result.error(res, "Token expired or invalid"));
  }
});

module.exports = router;