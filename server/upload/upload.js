const IncomingForm = require('formidable').IncomingForm
const fs = require('fs')
var path = require('path');

module.exports = function upload(req, res) {
    var form = new IncomingForm()
    form.on('file', (field, file) => {
        var oldpath = file.path;
        // var newpath = __dirname  + file.name;
        var newpath = path.join(__dirname, '..', 'image_uploads', file.name);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    })
    form.on('end', () => {
        res.json()
    })
    form.parse(req)
}