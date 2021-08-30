fs = require('fs');

module.exports = {
  async get(req, res) {
    try {
      var img = fs.readFileSync('./img/room1_base.png');
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(img, 'binary');
    } catch (err) {
      res.status(500).json({ message: typeof err === 'string' ? err : err.message });
    }
  },
};
