const express = require("express");
const Booking = require("../../models/Booking");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL BOOKINGS =================
router.get("/get-all-bookings", async (req, res) => {
  try {
    const data = await Booking.find().populate("user");

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= GET USER BOOKINGS =================
router.get("/user/:userId", async (req, res) => {
  try {
    const data = await Booking.find({
      user: req.params.userId,
    });

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= CREATE BOOKING =================
router.post("/", async (req, res) => {
  try {
    const {
      user,
      transportType,
      transportId,
      seats,
      totalPrice,
    } = req.body;

    if (
      !user ||
      !transportType ||
      !transportId ||
      !seats ||
      !totalPrice
    ) {
      return res.send(
        result.error(res, "All fields required")
      );
    }

    const booking = await Booking.create({
      user,
      transportType,
      transportId,
      seats,
      totalPrice,
      status: "pending",
      paymentStatus: "unpaid",
    });

    res.send(
      result.success(res, booking, "Booking created")
    );
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= GET SINGLE BOOKING =================
router.get("/:id", async (req, res) => {
  try {
    const data = await Booking.findById(req.params.id)
      .populate("user");

    if (!data) {
      return res.send(
        result.error(res, "Booking not found")
      );
    }

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= CONFIRM BOOKING =================
router.put("/:id/confirm", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.send(
        result.error(res, "Booking not found")
      );
    }

    if (booking.status === "cancelled") {
      return res.send(
        result.error(res, "Cancelled booking can't confirm")
      );
    }

    booking.status = "confirmed";
    booking.paymentStatus = "paid";

    await booking.save();

    res.send(
      result.success(res, booking, "Booking confirmed")
    );
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= CANCEL BOOKING =================
router.put("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.send(
        result.error(res, "Booking not found")
      );
    }

    booking.status = "cancelled";

    await booking.save();

    res.send(
      result.success(res, booking, "Booking cancelled")
    );
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= DELETE BOOKING =================
router.delete("/:id", async (req, res) => {
  try {
    const data = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!data) {
      return res.send(
        result.error(res, "Booking not found")
      );
    }

    res.send(
      result.success(res, data, "Booking deleted")
    );
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

module.exports = router;