const mongoose = require('mongoose');

mongoose.models = {}; // Clear existing models
const transferSchema = new mongoose.Schema({
  name: String,
  position: String,
  oldTeam: String,
  newTeam: String
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
