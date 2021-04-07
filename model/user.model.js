const mongoose = require('mongoose');
const mongooseValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

userSchema.plugin(mongooseValidator);

module.exports = mongoose.model('User', userSchema);
