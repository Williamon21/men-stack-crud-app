// models/monster.js

const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
  name: String,
  weakness: String,
});

// REGISTER THE MODEL
const Monster = mongoose.model('Monster', monsterSchema);

// EXPORT THE MODEL
module.exports = Monster;
