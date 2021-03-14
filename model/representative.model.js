const mongoose = require('mongoose');

const repSchema = new mongoose.Schema({
  cid: { type: mongoose.Schema.ObjectId, ref: 'Company' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('Representative', repSchema);
