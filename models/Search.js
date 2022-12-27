const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            max: 500,
        },
        status: {
            type: String,
            default: 'searchUser',
        },
    },
    { timestamps: true },
    {
        collection: 'Search',
    },
);

module.exports = mongoose.model('Search', SearchSchema);
