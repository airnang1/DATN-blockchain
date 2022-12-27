const mongoose = require('mongoose');

const SelectFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    description: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    options: [String],
});

module.exports = mongoose.model('SelectField', SelectFieldSchema);
