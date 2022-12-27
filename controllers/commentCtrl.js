const { default: mongoose } = require('mongoose');
const Comment = require('../models/Comment.js');
const Comments = require('../models/Comment.js');
const Product = require('../models/Product');
const User = require('../models/User.js');

const commentCtrl = {
    createComment: async (req, res) => {
        try {
            const { productId } = req.body;

            const productItem = await Product.findById(productId);

            if (req.user.id) {
                const newComment = new Comments({
                    user: req.user.id,
                    ...req.body,
                });

                await Product.findOneAndUpdate(
                    { _id: productId },
                    {
                        $push: { comments: newComment._id },
                    },
                    { new: true },
                );

                const starProducts = await Promise.all(
                    productItem.comments.map((commentId) => {
                        return Comment.findOne({ _id: commentId });
                    }),
                );

                const starUpdate = [...starProducts, newComment].reduce(
                    (accumulator, item) => {
                        return item && accumulator + item.star;
                    },
                    0,
                );

                const starProductLength = starProducts.length + 1;

                const starNum = starUpdate / starProductLength;

                productItem.star = starNum.toFixed(2);

                await newComment.save();
                await productItem.save();

                res.status(200).json(newComment);
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateComment: async (req, res) => {
        try {
            const { newComment } = req.body;

            await Comments.updateOne(
                { _id: req.params.id, userId: newComment.userId },
                newComment,
            );

            res.status(200).json({ newComment });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateLikes: async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.id);
            const { userId, icon } = req.body;

            const isCheck = comment.likes.some(
                (item) => item.userId === userId,
            );

            if (!isCheck) {
                await comment.updateOne({
                    $push: { likes: { userId, icon } },
                });
            } else {
                await comment.updateOne({
                    $pull: { likes: { userId } },
                });
            }
            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getCommentById: async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.id);
            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    likeAndDislikeComment: async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.commentId);
            const userId = req.user.id;
            const user = await User.findById(userId);

            const status = comment.likes.some(
                (like) => like._id.toString() === userId,
            );

            if (userId) {
                if (!status) {
                    await comment.updateOne({ $push: { likes: user } });
                    res.status(200).json(comment);
                } else {
                    await comment.updateOne({ $pull: { likes: user._id } });
                    res.status(200).json(comment);
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comments.findById(req.params.id);
            await comment.deleteOne();
            res.status(200).json('the comment has been deleted');
        } catch (err) {
            console.log(err);

            res.status(500).json(err);
        }
    },
    getCommentsInStore: async (req, res) => {
        try {
            const comments = await Comments.find();
            return res.status(200).json({ comments });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};

module.exports = commentCtrl;
