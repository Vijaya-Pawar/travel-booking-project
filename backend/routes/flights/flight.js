const express = require("express");
const Flight = require("../../models/Flight");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL FLIGHTS =================
// GET http://localhost:5000/api/flights
router.get("/", async (req, res) => {
  try {
    const data = await Flight.find();

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= SEARCH FLIGHTS =================
// POST http://localhost:5000/api/flights/search
router.post("/search", async (req, res) => {
  try {
    const { from, to, date } = req.body;

    // At least one field required
    if (!from && !to && !date) {
      return res
        .status(400)
        .send(result.error(res, "At least one search field is required"));
    }

    let query = {};

    if (from) query.from = from;
    if (to) query.to = to;

    // Date range search (fix for mismatch issues)
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      query.date = { $gte: start, $lt: end };
    }

    const data = await Flight.find(query);

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= CREATE FLIGHT =================
// POST http://localhost:5000/api/flights
router.post("/", async (req, res) => {
  try {
    const data = await Flight.create(req.body);

    return res
      .status(201)
      .send(result.success(res, data, "Flight created successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= UPDATE FLIGHT =================
// PUT http://localhost:5000/api/flights/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Flight.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).send(result.error(res, "Flight not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "Flight updated successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= DELETE FLIGHT =================
// DELETE http://localhost:5000/api/flights/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Flight.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send(result.error(res, "Flight not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "Flight deleted successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});

module.exports = router;