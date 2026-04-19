const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Score', ScoreSchema);
