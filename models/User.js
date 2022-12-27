const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        loginDomain: {
            type: String,
            default: "system",//can be facebook, google as well
            enum:['system', 'facebook', 'google', 'cryptoWallet']
        },
        fullName: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        dateOfBirth: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            default: 'male',
        },
        phoneNumber: {
            type: String,
            default: '',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        city: {
            type: String,
            max: 50,
            default: '',
        },
        from: {
            type: String,
            max: 50,
            default: '',
        },
        addressWallet: {
            type: String,
            max: 50,
            default: '',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        address: [
            {
                receiver: {
                    type: String,
                    max: 80,
                    min: 10,
                    required: true,
                },
                phoneNumber: {
                    type: String,
                    max: 20,
                    min: 8,
                    required: true,
                },
                location: {
                    type: String,
                    max: 100,
                    min: 10,
                    required: true,
                },
                locationDetail: {
                    type: String,
                    max: 200,
                    min: 10,
                    required: true,
                },
                statusLocation: {
                    type: String,
                    required: true,
                    default: '',
                },
                isActive: {
                    type: Boolean,
                    required: true,
                    default: false,
                },
            },
        ],
        Date: {
            type: Date,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
    {
        collection: 'User',
    },
);

module.exports = mongoose.model('User', UserSchema);
