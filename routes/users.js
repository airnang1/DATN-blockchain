const router = require('express').Router();
const auth = require('../middleware/auth.js');
const usersCtrl = require('../controllers/usersCtrl.js');

// get user admin
router.get('/', auth, usersCtrl.getUserInfo);
router.get('/all', usersCtrl.getUsersInStore);
router.get('/search', usersCtrl.searchUsers);

router.get('/:userId', usersCtrl.getUseToDB);
router.put('/', auth, usersCtrl.updateUserProfile);
router.delete('/:userId', usersCtrl.deleteUser);



module.exports = router;
