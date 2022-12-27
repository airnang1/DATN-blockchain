const mongoose = require('mongoose');

const InputFieldConfigProductSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
});

module.exports = mongoose.model(
    'InputFieldConfigProduct',
    InputFieldConfigProductSchema,
);
