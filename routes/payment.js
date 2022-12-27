const router = require('express').Router();
const paymentCtrl = require('../controllers/paymentCtrl.js');

router.post('/', paymentCtrl.createPaypalPayment);
router.get('/success', paymentCtrl.getPaypalPaymentSuccess);
router.get('/cancel', paymentCtrl.getPaypalPaymentCancel);

module.exports = router;
