var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'image_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file')

module.exports = upload