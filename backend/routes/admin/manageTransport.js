const express = require("express");

const Flight = require("../../models/Flight");
const Bus = require("../../models/Bus");
const Train = require("../../models/Train");
const Metro = require("../../models/Metro");

const result = require("../../utils/result");

const router = express.Router();

// Helper to get model
const getModel = (type) => {
  if (type === "flight") return Flight;
  if (type === "bus") return Bus;
  if (type === "train") return Train;
  if (type === "metro") return Metro;
};

// ================= GET ALL =================
// URL: GET http://localhost:5000/api/transport/:type
router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const Model = getModel(type);
    const data = await Model.find();

    res.send(result.success(res, data));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

// ================= CREATE =================
// URL: POST http://localhost:5000/api/transport/:type
router.post("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const Model = getModel(type);
    const data = await Model.create(req.body);

    res.send(result.success(res, data, `${type} added`));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

// ================= UPDATE =================
// URL: PUT http://localhost:5000/api/transport/:type/:id
router.put("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;

    const Model = getModel(type);

    const data = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.send(result.success(res, data, `${type} updated`));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

// ================= DELETE =================
// URL: DELETE http://localhost:5000/api/transport/:type/:id
router.delete("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;

    const Model = getModel(type);

    const data = await Model.findByIdAndDelete(id);

    res.send(result.success(res, data, `${type} deleted`));
  } catch (error) {
    res.send(result.error(res, error.message));
  }
});

module.exports = router;