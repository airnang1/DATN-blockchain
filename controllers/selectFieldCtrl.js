const SelectField = require('../models/SelectField.js');

const selectFieldCtrl = {
    getSelectFields: async (req, res) => {
        try {
            const selectField = await SelectField.find();
            res.status(200).json(selectField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    createSelectField: async (req, res) => {
        try {
            const newSelectField = new SelectField(req.body);
            const savedSelectField = await newSelectField.save();
            res.status(200).json(savedSelectField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateSelectField: async (req, res) => {
        try {
            const selectField = await SelectField.findById(req.params.id);
            await selectField.updateOne({ $set: req.body });
            res.status(200).json('the input Field has been updated');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteSelectField: async (req, res) => {
        try {
            const selectField = await SelectField.findById(req.params.id);
            await selectField.deleteOne();
            res.status(200).json(selectField);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = selectFieldCtrl;
