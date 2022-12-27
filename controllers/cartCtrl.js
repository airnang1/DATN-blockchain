const Cart = require('../models/Cart.js');
const Product = require('../models/Product.js');

const cartCtrl = {
    createCartToUser: async (req, res) => {
        try {
            const { id } = req.user;

            if (id) {
                const userCart = await Cart.findOne({ userId: id });

                if (userCart) {
                    return res.status(200).json(userCart);
                } else {
                    const newUserCart = new Cart({
                        userId: id,
                        cart: {
                            items: [],
                            totalPrice: 0,
                        },
                    });
                    const cartUserNew = await newUserCart.save();
                    return res.status(200).json(cartUserNew);
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    addProductToCart: async (req, res) => {
        try {
            const { productId, qty, indexProduct } = req.body;
            const { id } = req.user;

            if (id) {
                const product = await Product.findById({ _id: productId });
                const cartUser = await Cart.findOne({ userId: id });

                if (cartUser) {
                    if (product) {
                        const isExisting = cartUser.cart.items.findIndex(
                            (objInItems) =>
                                new String(objInItems.productId).trim() ===
                                new String(product._id).trim(),
                        ); // check productId in cart

                        if (isExisting >= 0) {
                            const isCheckIndexProduct =
                                cartUser.cart.items.some((objInItems) => {
                                    if (
                                        objInItems.productId ===
                                        product._id.toString()
                                    ) {
                                        return (
                                            objInItems.indexProduct ===
                                            indexProduct
                                        );
                                    }
                                });

                            if (isCheckIndexProduct) {
                                cartUser.cart.items.forEach((item) => {
                                    if (
                                        item.productId ===
                                        product._id.toString()
                                    ) {
                                        if (
                                            item.indexProduct === indexProduct
                                        ) {
                                            item.qty += qty;
                                        }
                                    }
                                });
                            } else {
                                cartUser.cart.items.push(req.body);
                            }
                        } else {
                            cartUser.cart.items.push(req.body);
                        }
                        if (!cartUser.cart.totalPrice) {
                            cartUser.cart.totalPrice = 0;
                        }
                        cartUser.cart.totalPrice += product.price * qty;
                        const data = await cartUser.save();
                        return res.status(200).json(data);
                    }
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    removeProductToCart: async (req, res) => {
        try {
            const { cartId } = req.params;
            const { productId, price } = req.body;
            const cartUser = await Cart.findOne({ _id: cartId });

            const isExisting = cartUser.cart.items.findIndex(
                (objInItems) =>
                    new String(objInItems.productId).trim() ===
                    new String(productId).trim(),
            );

            if (isExisting >= 0) {
                if (cartUser.cart.totalPrice) {
                    if (cartUser.cart.items[isExisting]) {
                        const priceProduct =
                            cartUser.cart.items[isExisting].qty;
                        cartUser.cart.totalPrice -= price * priceProduct;
                    }
                    cartUser.cart.items.splice(isExisting, 1);
                    cartUser.save();
                    return res.status(200).json(cartUser);
                }
            } else {
                throw 500;
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    updateAmountProductToCart: async (req, res) => {
        try {
            const { cartId } = req.params;
            const { productId, indexProduct, qty } = req.body;

            const cartUser = await Cart.findOne({ _id: cartId });

            const isExisting = cartUser.cart.items.findIndex(
                (objInItems) =>
                    new String(objInItems.productId).trim() ===
                        new String(productId).trim() &&
                    objInItems.indexProduct === indexProduct,
            );

            if (isExisting >= 0) {
                if (cartUser.cart.items[isExisting]) {
                    if (qty === 0) {
                        cartUser.cart.items.splice(isExisting, 1);
                    } else {
                        cartUser.cart.items[isExisting].qty = qty;
                        cartUser.cart.totalPrice +=
                            cartUser.cart.items[isExisting].price *
                            cartUser.cart.items[isExisting].qty;
                    }
                    cartUser.save();
                    return res.status(200).json(cartUser);
                }
            } else {
                throw 500;
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    resetCart: async (req, res) => {
        try {
            const { cartId } = req.params;

            const cartUser = await Cart.findOne({ _id: cartId });

            if (cartUser) {
                cartUser.cart.items = [];
                cartUser.cart.totalPrice = 0;
                cartUser.save();
                return res.status(200).json(cartUser);
            } else {
                throw 500;
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    searchSimilarProduct: async (req, res) => {
        try {
            const { category, price, trademark } = req.body;
            let priceActive = 8000000;
            let productsSimilar = [];

            const products = await Product.find();

            products.forEach((product) => {
                if (
                    product.category === category &&
                    product.description.trademark === trademark
                ) {
                    const priceChange = product.price - price;
                    if (priceChange < 0) {
                        if (Math.abs(priceChange) < priceActive) {
                            productsSimilar.push(product);
                        }
                    } else {
                        if (priceChange < priceActive) {
                            productsSimilar.push(product);
                        }
                    }

                    if (productsSimilar.length <= 0) {
                        priceActive += 1000000;
                    }
                }
            });

            return res.status(200).json(productsSimilar);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    removeProductsToCart: async (req, res) => {
        try {
            const { productsId, cartId } = req.body;

            if (cartId) {
                const cartUser = await Cart.findOne({ _id: cartId });
                cartUser.cart.items = cartUser.cart.items.filter((item) => {
                    return !productsId.includes(item._id.toString());
                });

                await cartUser.save();
                return res.status(200).json(cartUser);
            } else {
                return res.status(400).json({ msg: 'remove product failed' });
            }
            
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = cartCtrl;
