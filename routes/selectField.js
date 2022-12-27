const router = require('express').Router();
const selectFieldCtrl = require('../controllers/selectFieldCtrl.js');

// get user admin
router.get('/', selectFieldCtrl.getSelectFields);
router.post('/', selectFieldCtrl.createSelectField);
router.patch('/:id', selectFieldCtrl.updateSelectField);
router.delete('/:id', selectFieldCtrl.deleteSelectField);

module.exports = router;
