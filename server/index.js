const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors')
const upload = require('./upload/upload')

const app = express();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/upload', upload)

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);