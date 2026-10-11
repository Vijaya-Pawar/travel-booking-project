const express = require("express");
const Metro = require("../../models/Metro");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL METRO ROUTES =================
// GET http://localhost:5000/api/metros
router.get("/", async (req, res) => {
  try {
    const data = await Metro.find();

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= SEARCH METRO =================
// POST http://localhost:5000/api/metros/search
router.post("/search", async (req, res) => {
  try {
    const { from, to } = req.body;

    // validation
    if (!from && !to) {
      return res
        .status(400)
        .send(result.error(res, "At least one field required (from/to)"));
    }

    let query = {};

    if (from) query.from = from;
    if (to) query.to = to;

    const data = await Metro.find(query);

    return res.status(200).send(result.success(res, data));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= CREATE METRO ROUTE =================
// POST http://localhost:5000/api/metros
router.post("/", async (req, res) => {
  try {
    const data = await Metro.create(req.body);

    return res
      .status(201)
      .send(result.success(res, data, "Metro created successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= UPDATE METRO =================
// PUT http://localhost:5000/api/metros/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Metro.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).send(result.error(res, "Metro not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "Metro updated successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});


// ================= DELETE METRO =================
// DELETE http://localhost:5000/api/metros/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Metro.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send(result.error(res, "Metro not found"));
    }

    return res
      .status(200)
      .send(result.success(res, data, "Metro deleted successfully"));
  } catch (error) {
    return res.status(500).send(result.error(res, error.message));
  }
});

module.exports = router;