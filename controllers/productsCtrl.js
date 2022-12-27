const Product = require('../models/Product.js');
const Comments = require('../models/Comment.js');
const mongoose = require('mongoose');

const Pagination = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    if (req.query.skip) {
        return { page, limit, skip: +req.query.skip };
    } else {
        let skip = (page - 1) * limit;
        return { page, limit, skip };
    }
};

const Pagination2 = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = (Number(req.query.limit) * 1 || 5) * page;
    return { page, limit };
};

const product = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getProducts: async (req, res) => {
        const { limit } = Pagination2(req);
        
        try {
            const products = await Product.find()
                .sort('-createdAt')
                .limit(limit);

            const countProducts = await Product.countDocuments();

            let total = 0;

            if (countProducts % limit === 0) {
                total = countProducts / limit;
            } else {
                total = Math.floor(countProducts / limit) + 1;
            }

            return res.status(200).json({
                products,
                count: countProducts,
                total,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getProduct: async (req, res) => {
        const { limit, skip } = Pagination(req);

        try {
            const { productId } = req.params;
            const comments = await Comments.find({ productId });

            const product = await Product.findById(productId).populate({
                path: 'comments',
                populate: {
                    path: 'user likes',
                    select: '-password',
                },
                options: {
                    sort: { createdAt: -1 },
                    limit: limit,
                    skip: skip,
                },
            });

            let total = 0;

            if (comments.length % limit === 0) {
                total = comments.length / limit;
            } else {
                total = Math.floor(comments.length / limit) + 1;
            }

            return res
                .status(200)
                .json({ product, total, totalCmt: comments.length });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getProductPagination: async (req, res) => {
        const { limit, skip } = Pagination(req);

        try {
            const Data = await Product.aggregate([
                {
                    $facet: {
                        totalData: [
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit },
                        ],
                        totalCount: [
                            { $sort: { createdAt: -1 } },
                            { $count: 'count' },
                        ],
                    },
                },
                {
                    $project: {
                        count: { $arrayElemAt: ['$totalCount.count', 0] },
                        totalData: 1,
                    },
                },
            ]);

            const products = Data[0].totalData;
            const count = Data[0].count;

            // Pagination
            let total = 0;

            if (count % limit === 0) {
                total = count / limit;
            } else {
                total = Math.floor(count / limit) + 1;
            }

            res.status(200).json({ products, total, count });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProductLike: async (req, res) => {
        try {
            const product = await Product.findById(req.params.productId);
            if (req.user.id) {
                if (!product.likes.includes(req.user.id)) {
                    await product.updateOne({ $push: { likes: req.user.id } });
                    res.status(200).json('The product has been liked');
                } else {
                    await product.updateOne({ $pull: { likes: req.user.id } });
                    res.status(200).json('The post has been disliked');
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    searchProduct: async (req, res) => {
        const { limit, skip } = Pagination(req);
        const { keyword } = req.query;
        try {
            const products = await Product.aggregate([
                {
                    $search: {
                        index: 'default',
                        text: {
                            query: keyword,
                            path: ['name', 'category', 'description'],
                        },
                        highlight: {
                            path: 'name',
                        },
                    },
                },
                { $skip: skip },
                { $limit: limit },
            ]);

            const countProducts = await Product.aggregate([
                {
                    $search: {
                        index: 'default',
                        text: {
                            query: keyword,
                            path: ['name', 'category', 'description'],
                        },
                        highlight: {
                            path: 'name',
                        },
                    },
                },
                {
                    $count: 'count_product',
                },
            ]);

            let count = 0;
            if (countProducts[0]) {
                count = countProducts[0].count_product;
            }
            // Pagination
            let total = 0;

            if (count % limit === 0) {
                total = count / limit;
            } else {
                total = Math.floor(count / limit) + 1;
            }


            res.status(200).json({ products, total, count });
        } catch (err) {
            console.log(err);

            return res.status(500).json({ msg: err.message });
        }
    },
    filterStarProducts: async (req, res) => {
        try {
            const { star, keyword } = req.query;

            const starNumber = Number(star);

            if (starNumber === 5) {
                let products = await Product.aggregate([
                    {
                        $search: {
                            index: 'default',
                            text: {
                                query: keyword,
                                path: ['name', 'category', 'description'],
                            },
                            highlight: {
                                path: 'name',
                            },
                        },
                    },
                    {
                        $match: {
                            star: starNumber,
                        },
                    },
                ]);
                return res.status(200).json({ products });
            } else if (starNumber === 4) {
                let products = await Product.aggregate([
                    {
                        $search: {
                            index: 'default',
                            text: {
                                query: keyword,
                                path: ['name', 'category', 'description'],
                            },
                            highlight: {
                                path: 'name',
                            },
                        },
                    },
                    {
                        $match: {
                            star: {
                                $gte: 4,
                                $lt: 5,
                            },
                        },
                    },
                ]);
                return res.status(200).json({ products });
            } else {
                let products = await Product.aggregate([
                    {
                        $search: {
                            index: 'default',
                            text: {
                                query: keyword,
                                path: ['name', 'category', 'description'],
                            },
                            highlight: {
                                path: 'name',
                            },
                        },
                    },
                    {
                        $match: {
                            star: {
                                $gte: 0,
                                $lt: 4,
                            },
                        },
                    },
                ]);
                return res.status(200).json({ products });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    filterPriceProduct: async (req, res) => {
        try {
            const { keyword, minPrice, maxPrice } = req.query;

            if (maxPrice !== undefined) {
                let products = await Product.aggregate([
                    {
                        $search: {
                            index: 'default',
                            text: {
                                query: keyword,
                                path: ['name', 'category', 'description'],
                            },
                            highlight: {
                                path: 'name',
                            },
                        },
                    },
                    {
                        $match: {
                            price: {
                                $gte: +minPrice,
                                $lt: +maxPrice,
                            },
                        },
                    },
                ]);

                return res.status(200).json({ products });
            } else {
                let products = await Product.aggregate([
                    {
                        $search: {
                            index: 'default',
                            text: {
                                query: keyword,
                                path: ['name', 'category', 'description'],
                            },
                            highlight: {
                                path: 'name',
                            },
                        },
                    },
                    {
                        $match: {
                            price: {
                                $gt: +minPrice,
                            },
                        },
                    },
                ]);

                return res.status(200).json({ products });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getProductsInStore: async (req, res) => {
        try {
            const products = await Product.find();
            return res.status(200).json({ products });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    searchProductToDB: async (req, res) => {
        const { keys } = req.query;

        try {
            let query = [];
            if (keys) {
                query.push({
                    $match: {
                        $or: [
                            {
                                name: { $regex: keys, $options: 'i' },
                            },
                            {
                                category: { $regex: keys, $options: 'i' },
                            },
                            {
                                'description.trademark': {
                                    $regex: keys,
                                    $options: 'i',
                                },
                            },
                        ],
                    },
                });
            }
            let products = await Product.aggregate(query);
            return res.status(200).json({ products });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    removeProductToDB: async (req, res) => {
        const { productID } = req.params;
        try {
            await Product.deleteOne({ _id: productID });
            return res.status(200).json({ productID });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    updateDataProductToDB: async (req, res) => {
        const { productID } = req.params;

        const productIdObj = mongoose.Types.ObjectId(productID);

        try {
            const product = await Product.update(
                { _id: productIdObj },
                {
                    $set: {
                        ...req.body,
                    },
                },
            );

            res.status(200).json({ product });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = product;
