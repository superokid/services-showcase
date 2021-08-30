const express = require('express');
const leaderboardController = require('../api/leaderboard/controller');
const canvasController = require('../api/canvas/controller');

const router = express.Router();

router.get('/hi', (req, res) => {
  res.send('hello');
});

router.get('/leaderboard', leaderboardController.get);
router.get('/canvas/room', canvasController.get);

module.exports = router;
