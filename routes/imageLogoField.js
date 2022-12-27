const router = require('express').Router();
const imageLogoFieldCtrl = require('../controllers/ImageLogoFieldCtrl.js');

// get user admin
router.get('/', imageLogoFieldCtrl.getImageLogoFields);
router.post('/', imageLogoFieldCtrl.createImageLogoField);
router.delete('/:id', imageLogoFieldCtrl.deleteImageLogoField);

module.exports = router;
