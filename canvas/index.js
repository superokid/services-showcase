require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.use('/v1', routes);

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${PORT}`);
});
