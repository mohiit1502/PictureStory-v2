var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ImgSchema = new Schema({
    img: {
        identifier: Number,
        data: Buffer,
        variant: String, 
        name: String,
        description: String,
        tags: [String],
        contentType: String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Image', ImgSchema);