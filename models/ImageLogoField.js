const mongoose = require('mongoose');

const ImageLogoFieldSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ImageLogoField', ImageLogoFieldSchema);
