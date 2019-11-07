const fs = require('fs');
const mongoose = require('mongoose');
const Image = require('./../models/Image.model')
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://mohiit1502:astalavista2402@cluster-ecstatica-base-adspg.mongodb.net/ecstatica?retryWrites=true&w=majority')
// const MongoClient = require('mongodb').MongoClient;

// const uri = "mongodb+srv://mohiit1502:astalavista2402@cluster-ecstatica-base-adspg.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = {
    save: function(req, res) {
        var files = req.files
        var filesOrganized = {}
        files && files.forEach((file) => {
            var fileName
            if (file.originalname.includes('compressed_20')) {
                fileName = file.originalname.substring(0, file.originalname.indexOf('_compressed'));
                file.name = fileName;
                filesOrganized[fileName] = {...filesOrganized[fileName], compressed_20: file}
            } else if (file.originalname.includes('compressed_60')) {
                fileName = file.originalname.substring(0, file.originalname.indexOf('_compressed'));
                file.name = fileName;
                filesOrganized[fileName] = {...filesOrganized[fileName], compressed_60: file}
            } else {
                fileName = file.originalname.substring(0, file.originalname.indexOf('.'));
                file.name = fileName;
                filesOrganized[fileName] = {...filesOrganized[fileName], standard: file}
            }
        })
        filesOrganized && Object.keys(filesOrganized).forEach((fileName) => {
            var fileVariants = filesOrganized[fileName]
            var timestamp = Date.now();
            
            Object.keys(fileVariants).forEach((fileVariantKey) => {
                var fileVariant = fileVariants[fileVariantKey];
                var new_img = new Image
                new_img.img.identifier = timestamp;
                new_img.img.variant = fileVariantKey;
                new_img.img.name = fileVariant.name
                new_img.img.data = fs.readFileSync(fileVariants[fileVariantKey].path)
                new_img.img.tags.push('nature')
                new_img.img.contentType = 'image/jpeg';
                new_img.save();
            })
        })
        return res.json({ message: 'New image and its variants added to the db!' });
    },
    find: function(req, res) {
        // return Image.findOne({}, 'img createdAt', function(err, img) {
        Image.find({'img.variant': 'compressed_20', 'img.tags': 'nature'}, 'img createdAt', function(err, img) {
            if (err)
                res.send(err);
            // console.log('images === ' + img);
            res.contentType('json');
            res.send(img);
        }).sort({ createdAt: 'desc' });
    }
}