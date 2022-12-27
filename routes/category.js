const router = require('express').Router();
const categorySidebarCtrl = require('../controllers/categorySidebaarCtrl.js');

// get category admin
router.get('/', categorySidebarCtrl.getDataCategoryStore);
router.get('/get-products', categorySidebarCtrl.handleGetProductsCategory);
router.get('/trademark', categorySidebarCtrl.filterTrademarkProduct);
router.post('/star', categorySidebarCtrl.filterStarProducts);
router.post('/price', categorySidebarCtrl.filterPriceProduct);

module.exports = router;
