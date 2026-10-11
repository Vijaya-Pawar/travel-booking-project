const express = require("express");

const Bus = require("../../models/Bus");
const Train = require("../../models/Train");
const Flight = require("../../models/Flight");
const Metro = require("../../models/Metro");

const result = require("../../utils/result");

const router = express.Router();


// ================= HELPER =================
const getModel = (type) => {
  type = type.toLowerCase();

  if (type === "bus") return Bus;
  if (type === "train") return Train;
  if (type === "flight") return Flight;
  if (type === "metro") return Metro;

  return null;
};


// ================= HOME PAGE DATA =================
router.get("/home", async (req, res) => {
  try {
    const flights = await Flight.find().limit(4);
    const buses = await Bus.find().limit(4);
    const trains = await Train.find().limit(4);
    const metros = await Metro.find().limit(4);

    res.json({
      status: "success",
      data: {
        flights,
        buses,
        trains,
        metros,
      },
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});


// ================= GLOBAL SEARCH =================
router.post("/search", async (req, res) => {
  try {
    const { from, to, date } = req.body;

    const searchFrom = {
      $regex: from || "",
      $options: "i",
    };

    const searchTo = {
      $regex: to || "",
      $options: "i",
    };

    const buses = await Bus.find({
      from: searchFrom,
      to: searchTo,
      date,
    });

    const trains = await Train.find({
      from: searchFrom,
      to: searchTo,
      date,
    });

    const flights = await Flight.find({
      from: searchFrom,
      to: searchTo,
      date,
    });

    const metro = await Metro.find({
      from: searchFrom,
      to: searchTo,
    });

    res.send(
      result.success(
        res,
        { buses, trains, flights, metro },
        "Search results"
      )
    );
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});


// ================= GET SINGLE TRANSPORT =================
router.get("/:type/:id", async (req, res) => {
  try {
    const Model = getModel(req.params.type);

    if (!Model) {
      return res.send(
        result.error(res, "Invalid transport type")
      );
    }

    const data = await Model.findById(req.params.id);

    if (!data) {
      return res.send(
        result.error(res, "Transport not found")
      );
    }

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

module.exports = router;