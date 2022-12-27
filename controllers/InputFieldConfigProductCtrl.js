const InputFieldConfigProduct = require('../models/InputFieldConfigProduct.js');

const inputFieldConfigProductCtrl = {
    getInputFieldConfigProducts: async (req, res) => {
        try {
            const inputFields = await InputFieldConfigProduct.find();
            res.status(200).json(inputFields);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    createInputFieldConfigProduct: async (req, res) => {
        try {
            const newInputField = new InputFieldConfigProduct(req.body);
            const savedInputField = await newInputField.save();
            res.status(200).json(savedInputField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateInputFieldConfigProduct: async (req, res) => {
        try {
            const inputField = await InputFieldConfigProduct.findById(
                req.params.id,
            );
            await inputField.updateOne({ $set: req.body });
            res.status(200).json('the input Field has been updated');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteInputFieldConfigProduct: async (req, res) => {
        try {
            const inputField = await InputFieldConfigProduct.findById(
                req.params.id,
            );
            await inputField.deleteOne();
            res.status(200).json(inputField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = inputFieldConfigProductCtrl;
