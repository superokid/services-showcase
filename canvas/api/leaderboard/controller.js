const Tatsu = require('tatsu');
const { TATSU_TOKEN, GUILD_ID } = process.env;

const tatsu = new Tatsu(TATSU_TOKEN);

module.exports = {
  async get(req, res) {
    try {
      const { offset } = req.query || {};
      if (offset === 0) {
        res.status(200).json({ data: data });
      }
      const data = await tatsu.getGuildRankings(GUILD_ID, offset);
      res.status(200).json({ data: data });
    } catch (err) {
      res.status(500).json({ message: typeof err === 'string' ? err : err.message });
    }
  },
};
