require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Score = require('./models/Score');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .catch(err => console.error(err));

app.get('/api/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(5);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/score', async (req, res) => {
  const { username, score, level } = req.body;
  try {
    let userScore = await Score.findOne({ username });
    if (userScore) {
      if (score > userScore.score) {
        userScore.score = score;
        userScore.level = level;
        await userScore.save();
      }
    } else {
      userScore = new Score({ username, score, level });
      await userScore.save();
    }
    res.json(userScore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
