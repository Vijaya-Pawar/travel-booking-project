const express = require("express");
const Booking = require("../../models/Booking");
const result = require("../../utils/result");

const router = express.Router();

// ================= GET ALL BOOKINGS =================
// GET /api/bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");

    return result.success(res, bookings, "All bookings fetched");
  } catch (error) {
    return result.error(res, error.message);
  }
});

// ================= UPDATE BOOKING STATUS =================
// PUT /api/bookings/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return result.error(res, "Status is required");
    }

    const data = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!data) {
      return result.error(res, "Booking not found");
    }

    return result.success(res, data, "Booking updated");
  } catch (error) {
    return result.error(res, error.message);
  }
});

// ================= DELETE BOOKING =================
// DELETE /api/bookings/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Booking.findByIdAndDelete(id);

    if (!data) {
      return result.error(res, "Booking not found");
    }

    return result.success(res, data, "Booking deleted");
  } catch (error) {
    return result.error(res, error.message);
  }
});

module.exports = router;