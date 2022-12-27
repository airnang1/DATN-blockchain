const Product = require('../models/Product.js');

const Pagination = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    let skip = (page - 1) * limit;

    return { page, limit, skip };
};

const categoryProductCtrl = {
    getDataCategoryStore: async (req, res) => {
        try {
            const categoryProduct = await Product.aggregate([
                {
                    $group: {
                        _id: '$category',
                    },
                },
            ]);

            const categoryMenu = await Promise.all(
                categoryProduct.map(async (category, index) => {
                    const data = await Product.aggregate([
                        {
                            $match: {
                                category: category._id,
                            },
                        },
                        {
                            $group: {
                                _id: '$description.trademark',
                            },
                        },
                        {
                            $sort: {
                                _id: 1,
                            },
                        },
                        {
                            $addFields: {
                                category: category._id,
                            },
                        },
                    ]);

                    const productsChange = await Promise.all(
                        data.map(async (item) => {
                            const products = await Product.find({
                                category: category._id,
                                'description.trademark': item._id,
                            });
                            return products;
                        }),
                    );

                    const categoryChange = data.map((item, index) => {
                        const listData = [];
                        productsChange[index].forEach((product) => {
                            if (product.description.trademark === item._id) {
                                listData.push(product.name);
                            }
                        });

                        return {
                            name_category: item._id,
                            listData,
                        };
                    });

                    return {
                        title: category._id,
                        link: `/category/${category._id}/all`,
                        category: categoryChange,
                    };
                }),
            );

            res.status(200).json({ categoryMenu });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    handleGetProductsCategory: async (req, res) => {
        const { limit, skip } = Pagination(req);
        const { category, keyword } = req.query;

        try {
            if (keyword === 'all') {
                let products = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    { $skip: skip },
                    { $limit: limit },
                ]);

                let countProducts = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    {
                        $count: 'count_product',
                    },
                ]);

                let trademark = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    {
                        $group: {
                            _id: '$description.trademark',
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
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

                return res.status(200).json({
                    products,
                    trademark: [{ _id: 'Tất cả' }, ...trademark],
                    total,
                    count,
                });
            } else {
                let products = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    {
                        $match: {
                            $or: [
                                { 'description.trademark': keyword },
                                { name: keyword },
                            ],
                        },
                    },
                    { $skip: skip },
                    { $limit: limit },
                ]);

                let countProducts = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    {
                        $match: {
                            $or: [
                                { 'description.trademark': keyword },
                                { name: keyword },
                            ],
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

                return res.status(200).json({ products, total, count });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    filterStarProducts: async (req, res) => {
        try {
            const { star, keyword, category } = req.body;

            const starNumber = Number(star);

            if (starNumber === 5) {
                if (keyword === 'all') {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
                            },
                        },
                        {
                            $match: {
                                star: starNumber,
                            },
                        },
                    ]);
                    return res.status(200).json({ products });
                } else {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
                            },
                        },
                        {
                            $match: {
                                $or: [
                                    { 'description.trademark': keyword },
                                    { name: keyword },
                                ],
                            },
                        },
                        {
                            $match: {
                                star: starNumber,
                            },
                        },
                    ]);

                    return res.status(200).json({ products });
                }
            } else if (starNumber === 4) {
                if (keyword === 'all') {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
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
                            $match: {
                                category: category,
                            },
                        },
                        {
                            $match: {
                                $or: [
                                    { 'description.trademark': keyword },
                                    { name: keyword },
                                ],
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
                }
            } else {
                if (keyword === 'all') {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
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
                } else {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
                            },
                        },
                        {
                            $match: {
                                $or: [
                                    { 'description.trademark': keyword },
                                    { name: keyword },
                                ],
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
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    filterPriceProduct: async (req, res) => {
        try {
            const { keyword, price, category } = req.body;
            const { minPrice, maxPrice } = price;

            if (maxPrice !== null) {
                if (keyword === 'all') {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
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
                            $match: {
                                category: category,
                            },
                        },
                        {
                            $match: {
                                $or: [
                                    { 'description.trademark': keyword },
                                    { name: keyword },
                                ],
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
                }
            } else {
                if (keyword === 'all') {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
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
                } else {
                    let products = await Product.aggregate([
                        {
                            $match: {
                                category: category,
                            },
                        },
                        {
                            $match: {
                                $or: [
                                    { 'description.trademark': keyword },
                                    { name: keyword },
                                ],
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
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    filterTrademarkProduct: async (req, res) => {
        const { limit, skip } = Pagination(req);

        try {
            const { trademarkName, category } = req.query;
            if (trademarkName === 'Tất cả') {
                let products = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    { $skip: skip },
                    { $limit: limit },
                ]);
                let countProducts = await Product.aggregate([
                    {
                        $match: {
                            category: category,
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

                return res.status(200).json({
                    products,
                    total,
                    count,
                });
            } else {
                let products = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    {
                        $match: {
                            'description.trademark': trademarkName,
                        },
                    },
                    { $skip: skip },
                    { $limit: limit },
                ]);
                let countProducts = await Product.aggregate([
                    {
                        $match: {
                            category: category,
                        },
                    },
                    {
                        $match: {
                            'description.trademark': trademarkName,
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

                console.log({
                    products: products.length,
                    total,
                    count,
                });

                return res.status(200).json({
                    products,
                    total,
                    count,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = categoryProductCtrl;
