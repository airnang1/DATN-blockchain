const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl.js');
const auth = require('../middleware/auth.js');

router.post('/register', authCtrl.register);

router.post('/activate', authCtrl.activateEmail);

router.post('/login', authCtrl.login);

router.post('/refresh_token', authCtrl.getAccessToken);

router.post('/forgot-password', authCtrl.forgotPassword);

router.post('/reset-password', auth, authCtrl.resetPassword);

// social login

router.post('/google_login', authCtrl.googleLogin);

router.post('/facebook_login', authCtrl.facebookLogin);

router.post('/wallet_login', authCtrl.walletLogin);

router.post('/logout', authCtrl.logout);

module.exports = router;
