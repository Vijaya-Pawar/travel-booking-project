const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL USERS =================
// GET http://localhost:5000/api/users
router.get("/", async (req, res) => {
  try {
    const data = await User.find().select("-password");

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= GET USER PROFILE =================
// GET http://localhost:5000/api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findById(id).select("-password");

    if (!data) {
      return res.status(404).send(result.error(res, "User not found"));
    }

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= UPDATE USER PROFILE =================
// PUT http://localhost:5000/api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const data = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!data) {
      return res.status(404).send(result.error(res, "User not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "User updated successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= UPDATE PASSWORD =================
// PUT http://localhost:5000/api/users/:id/password
router.put("/:id/password", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send(result.error(res, "Password must be at least 6 characters"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!data) {
      return res.status(404).send(result.error(res, "User not found"));
    }

    return res
      .status(200)
      .send(result.success(res, null, "Password updated successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= DELETE USER =================
// DELETE http://localhost:5000/api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send(result.error(res, "User not found"));
    }

    return res
      .status(200)
      .send(result.success(res, null, "User deleted successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});

module.exports = router;