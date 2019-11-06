const fs = require('fs')
var path = require('path');
var multer = require('multer');

var EXTENSION = '.txt';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'image_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var download = () => {
    var dirpath = './../image_uploads/'
    fs.readdir(dirpath, function(err, files) {
        files.forEach(file => {
            console.log(file.originalname)
        })
        var targetFiles = files.filter(function(file) {
            return path.extname(file).toLowerCase() === EXTENSION;
        });
        targetFiles.forEach(file => {
            console.log(file.originalname)
        })
    })
}

// var upload = multer({ storage: storage }).array('file')

module.exports = download