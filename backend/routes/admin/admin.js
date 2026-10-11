const express = require("express");
const Booking = require("../../models/Booking");
const User = require("../../models/User");
const result = require("../../utils/result");

const router = express.Router();

// Admin Dashboard
router.get("/get_all_admin_data", async (req, res) => {
  try {
    const [users, bookings, confirmed] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "confirmed" }),
    ]);

    const data = {
      totalUsers: users,
      totalBookings: bookings,
      confirmedBookings: confirmed,
    };

    return result.success(res, data, "Dashboard data");
  } catch (error) {
    return result.error(res, error.message);
  }
});

module.exports = router;