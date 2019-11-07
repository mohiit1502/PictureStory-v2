const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors')
const upload = require('./filesManager/upload')
const download = require('./filesManager/download')
const multer = require('multer')
const mongoHandler = require('./dbManager/mongoIO')

const app = express();
var corsOptions = {origin: '*', optionsSuccessStatus: 200,}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/images/:type', (req, res) => {
  // download()
  // .then(result => res.status(200).send(result))
  // .catch(err => res.status(500).json(err))
  return mongoHandler.find(req, res)
})

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      console.log(err)
      return res.status(500).json(err)
    } else if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    return mongoHandler.save(req, res)
    // return res.status(200).send(req.file)
  })
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);