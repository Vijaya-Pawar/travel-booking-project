const express = require("express");
const User = require("../../models/User");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL USERS =================
// URL: GET http://localhost:5000/api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.send(result.success(res, users));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= DELETE USER =================
// URL: DELETE http://localhost:5000/api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findByIdAndDelete(id);

    if (!data) {
      return res.send(result.error(res, "User not found"));
    }

    res.send(result.success(res, data, "User deleted"));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

module.exports = router;