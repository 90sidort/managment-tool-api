const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  personel: { type: Number, required: true },
  location: { type: mongoose.Schema.ObjectId, ref: "Location" },
  title: { type: String, required: true },
  rate: { type: Number, required: true },
  currency: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  agent: { type: String },
  representative: { type: mongoose.Schema.ObjectId, ref: "Representative" },
  company: { type: mongoose.Schema.ObjectId, ref: "Company" },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, required: true },
  created: { type: Date, required: true },
});

module.exports = mongoose.model("Job", jobSchema);
