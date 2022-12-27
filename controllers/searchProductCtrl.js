const { default: mongoose } = require('mongoose');
const Search = require('../models/Search.js');

const searchCtrl = {
    createSearch: async (req, res) => {
        try {
            const search = await Search.findOne({ content: req.body.content });

            if (search) {
                const updateSearch = await Search.findOneAndUpdate(
                    { _id: search._id },
                    { createdAt: Date.now() },
                );

                res.status(200).json(updateSearch);
            } else {
                const newSearch = new Search(req.body);
                await newSearch.save();
                res.status(200).json(newSearch);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getSearches: async (req, res) => {
        try {
            const searches = await Search.find().sort('-updatedAt');
            res.status(200).json(searches);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteSearch: async (req, res) => {
        try {
            const search = await Search.findById(req.params.id);
            await search.deleteOne();
            res.status(200).json('the search has been deleted');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = searchCtrl;
