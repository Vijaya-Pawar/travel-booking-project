const express = require("express");
const Bus = require("../../models/Bus");
const result = require("../../utils/result");

const router = express.Router();


// ================= GET ALL BUSES =================
router.get("/", async (req, res) => {
  try {
    const data = await Bus.find();
    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= SEARCH BUSES (MOVED UP) =================
router.post("/search", async (req, res) => {
  try {
    const { from, to, date } = req.body;

    const data = await Bus.find({
      from: { $regex: from, $options: "i" },
      to: { $regex: to, $options: "i" },
      date,
    });

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= GET SINGLE BUS =================
router.get("/:id", async (req, res) => {
  try {
    const data = await Bus.findById(req.params.id);

    if (!data) {
      return res.send(result.error(res, "Bus not found"));
    }

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= CREATE BUS =================
router.post("/", async (req, res) => {
  try {
    const { name, from, to, date, price } = req.body;

    if (!name || !from || !to || !date || !price) {
      return res.send(
        result.error(res, "All fields required")
      );
    }

    const data = await Bus.create(req.body);

    res.send(result.success(res, data, "Bus created"));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= UPDATE BUS =================
router.put("/:id", async (req, res) => {
  try {
    const data = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.send(result.error(res, "Bus not found"));
    }

    res.send(result.success(res, data, "Bus updated"));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= DELETE BUS =================
router.delete("/:id", async (req, res) => {
  try {
    const data = await Bus.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.send(result.error(res, "Bus not found"));
    }

    res.send(result.success(res, data, "Bus deleted"));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

module.exports = router;