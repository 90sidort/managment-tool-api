const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  cid: { type: mongoose.Schema.ObjectId, ref: "Company" },
  city: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  postcode: { type: String, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
