const router = require('express').Router();
const auth = require('../middleware/auth.js');
const cartCtrl = require('../controllers/cartCtrl.js');

router.post('/', auth, cartCtrl.createCartToUser);
router.post('/search-similar', cartCtrl.searchSimilarProduct);
router.post('/:cartId', auth, cartCtrl.addProductToCart);
router.delete('/:cartId', cartCtrl.removeProductToCart);
router.put('/:cartId', cartCtrl.updateAmountProductToCart);
router.put('/reset/:cartId', cartCtrl.resetCart);
router.delete('/delete-product/:cartId', cartCtrl.removeProductsToCart);

module.exports = router;
