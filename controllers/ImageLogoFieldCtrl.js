const ImageLogoField = require('../models/ImageLogoField.js');

const imageLogoFieldCtrl = {
    getImageLogoFields: async (req, res) => {
        try {
            const imgField = await ImageLogoField.find();
            res.status(200).json(imgField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    createImageLogoField: async (req, res) => {
        try {
            const newImgField = new ImageLogoField(req.body);
            const savedImgField = await newImgField.save();
            res.status(200).json(savedImgField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteImageLogoField: async (req, res) => {
        try {
            const imgField = await ImageLogoField.findById(req.params.id);
            await imgField.deleteOne();
            res.status(200).json(imgField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = imageLogoFieldCtrl;
