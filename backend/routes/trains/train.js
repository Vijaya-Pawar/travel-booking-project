const express = require("express");
const Train = require("../../models/Train");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL TRAINS =================
// GET http://localhost:5000/api/trains
router.get("/", async (req, res) => {
  try {
    const data = await Train.find();

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= SEARCH TRAINS =================
// POST http://localhost:5000/api/trains/search
router.post("/search", async (req, res) => {
  try {
    const { from, to, date } = req.body;

    // validation
    if (!from && !to && !date) {
      return res
        .status(400)
        .send(result.error(res, "At least one field required (from/to/date)"));
    }

    let query = {};

    if (from) query.from = from;
    if (to) query.to = to;

    // safer date search (fix mismatch issues)
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      query.date = { $gte: start, $lt: end };
    }

    const data = await Train.find(query);

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= CREATE TRAIN =================
// POST http://localhost:5000/api/trains
router.post("/", async (req, res) => {
  try {
    const data = await Train.create(req.body);

    return res
      .status(201)
      .send(result.success(res, data, "Train created successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= UPDATE TRAIN =================
// PUT http://localhost:5000/api/trains/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Train.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).send(result.error(res, "Train not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "Train updated successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= DELETE TRAIN =================
// DELETE http://localhost:5000/api/trains/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Train.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send(result.error(res, "Train not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "Train deleted successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});
// ================= GET ALL DESTINATIONS =================
// GET http://localhost:5000/api/trains/destinations
router.get("/destinations", async (req, res) => {
  try {
    const from = await Train.distinct("from");
    const to = await Train.distinct("to");

    const destinations = [...new Set([...from, ...to])];

    return res.status(200).send(
      result.success(res, destinations, "All destinations fetched")
    );
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});

module.exports = router;