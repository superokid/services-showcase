const express = require('express');
const leaderboardController = require('../api/leaderboard/controller');

const router = express.Router();

router.get('/hi', (req, res) => {
  res.send('hello');
});

router.get('/leaderboard', leaderboardController.get);

module.exports = router;
