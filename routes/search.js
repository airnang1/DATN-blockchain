const router = require('express').Router();
const searchProductCtrl = require('../controllers/searchProductCtrl.js');

// get user admin
router.get('/', searchProductCtrl.getSearches);
router.post('/', searchProductCtrl.createSearch);
router.delete('/:id', searchProductCtrl.deleteSearch);

module.exports = router;
