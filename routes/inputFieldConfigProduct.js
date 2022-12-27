const router = require('express').Router();
const InputFieldConfigProductCtrl = require('../controllers/InputFieldConfigProductCtrl.js');

// get user admin
router.get('/', InputFieldConfigProductCtrl.getInputFieldConfigProducts);
router.post('/', InputFieldConfigProductCtrl.createInputFieldConfigProduct);
router.patch('/:id', InputFieldConfigProductCtrl.updateInputFieldConfigProduct);
router.delete(
    '/:id',
    InputFieldConfigProductCtrl.deleteInputFieldConfigProduct,
);

module.exports = router;
