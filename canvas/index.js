require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/v1', routes);

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${PORT}`);
});
