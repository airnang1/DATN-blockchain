const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Token', TokenSchema);
