const fs = require('fs')
var path = require('path');
var multer = require('multer');

var EXTENSION = '.jpg';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'image_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var download = () => {
    var dirpath = path.resolve(process.cwd(), './image_uploads/')
    return new Promise((resolve, reject) => {
        try {
            fs.readdir(dirpath, function(err, fileNames) {
                var targetFileNames = fileNames.filter(function(fileName) {
                    const namePart = fileName.split('.')[0]
                    return (path.extname(fileName).toLowerCase() === EXTENSION) && namePart.endsWith('compressed_20')
                });
                const files = targetFileNames && targetFileNames.map(targetFileName => {
                    filepath = dirpath + '/' + targetFileName;
                    return new Promise((resolve, reject) => {
                        fs.readFile(filepath, 'utf8', (err, data) => {
                            if (err) reject(err)
                            else resolve(data)
                        })
                    })
                })
                Promise.all(files).then(fileStream => {
                    // console.log(fileStream)
                    resolve(fileStream)
                }).catch(error => {
                    reject(error)
                });
            })
        } catch(err) {
            reject(err)
        }
    })
}

// var upload = multer({ storage: storage }).array('file')

module.exports = download