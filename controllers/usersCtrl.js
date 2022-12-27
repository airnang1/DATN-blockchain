const User = require('../models/User.js');
const Comment = require('../models/Comment.js');
const UserAddress = require('../models/UserAddress.js');
const Order = require('../models/Order.js');
const Cart = require('../models/Cart.js');

const user = {
    getUserInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    updateUserProfile: async (req, res) => {
        const { id } = req.user;
        const { username, gender, dateOfBirth, profilePicture, phoneNumber } =
            req.body;

        try {
            if (id) {
                const user = await User.update(
                    { _id: id },
                    {
                        $set: {
                            username,
                            gender,
                            dateOfBirth,
                            profilePicture,
                            phoneNumber,
                        },
                    },
                );
                res.status(200).json(user);
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getUsersInStore: async (req, res) => {
        try {
            const users = await User.find({ isAdmin: false }).select(
                '-password',
            );

            return res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getUseToDB: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId });
            return res.status(200).json({ user });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteUser: async (req, res) => {
        const { userId } = req.params;

        try {
            await User.deleteOne({ _id: userId });
            await Cart.deleteOne({ userId: userId });
            await Comment.deleteMany({ user: userId });
            await UserAddress.deleteMany({ userId: userId });
            await Order.deleteMany({ userID: userId });

            return res.status(200).json({ userId });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    searchUsers: async (req, res) => {
        const {username} = req.query;
        try {
            const users = await User.find({
                username: {
                    $regex: new RegExp(username, 'i'),
                },
            })
                .limit(10)
                .select('username profilePicture gender');

            return res.status(200).json({users});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = user;
