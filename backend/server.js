const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/calculator', require('./routes/calculatorRouter'));
app.get('/', (reg, res, next) => {
  res.json('Server is listening');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status = 500;
  res.json({
    hasError: true,
    message: 'Server Error',
  });
});

module.exports = app;
