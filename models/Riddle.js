const mongoose = require('mongoose');

const riddleSchema = new mongoose.Schema({
  category: String,
  riddle: String,
  answer: String,
  explanation: String,
});

const Riddle = mongoose.model('Riddle', riddleSchema);

module.exports = Riddle;
