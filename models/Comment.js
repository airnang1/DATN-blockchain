const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema(
    {
        star: {
            type: Number,
            required: true,
            maximum: 5,
            minimum: 0,
        },
        content: {
            type: String,
            max: 500,
        },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        media: {
            image: [
                {
                    url: {
                        type: String,
                    },
                },
            ],
            video: [
                {
                    url: {
                        type: String,
                    },
                },
            ],
        },
        tag: {
            type: Object,
        },
        reply: mongoose.Types.ObjectId,
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        productId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
    {
        collection: 'Comment',
    },
);

module.exports = mongoose.model('Comment', CommentsSchema);
