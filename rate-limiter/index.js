const express = require('express');
const rateLimiter = require('express-rate-limit');
const app = express();
const limiter = rateLimiter({
  limit: 3,
  windowMs: 60 * 1000, //in ms, so 3 requests are allowed in one minute, if user wants requests to be processed, he would have to wait till the next window, i.e after 1minute
  statusCode: 429, //default
  message: 'Too many requests, please try again later.', //default
});
app.use('/api', limiter);

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.use((err, req, res, next) => {
  res.status(500).message('Internal Server Error');
  console.log('Error', err);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
