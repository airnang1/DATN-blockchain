const router = require('express').Router();
const auth = require('../middleware/auth.js');
const productsCtrl = require('../controllers/productsCtrl.js');
const categorySidebarCtrl = require('../controllers/categorySidebaarCtrl.js');

// get product admin

router.get('/', productsCtrl.getProducts);
router.delete('/:productID', productsCtrl.removeProductToDB);
router.get('/all', productsCtrl.getProductsInStore);
router.get('/pagination', productsCtrl.getProductPagination);
router.get('/search', productsCtrl.searchProduct);
router.get('/search-productDB', productsCtrl.searchProductToDB);
router.get('/star', productsCtrl.filterStarProducts);
router.get('/price', productsCtrl.filterPriceProduct);

// product detail page
router.get('/:productId', productsCtrl.getProduct);

router.post('/', productsCtrl.createProduct);
router.put('/:productId', auth, productsCtrl.updateProductLike);
router.put('/update-data/:productID', productsCtrl.updateDataProductToDB);

module.exports = router;
