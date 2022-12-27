const router = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl.js');
const auth = require('../middleware/auth.js');

router.post('/', auth, commentCtrl.createComment);
router.put('/:id/like', auth, commentCtrl.updateLikes);
router.get('/all', commentCtrl.getCommentsInStore);
router.get('/:id', commentCtrl.getCommentById);
router.put('/update/:id', auth, commentCtrl.updateComment);
router.delete('/delete/:id', auth, commentCtrl.deleteComment);
router.post('/:commentId', auth, commentCtrl.likeAndDislikeComment);

module.exports = router;
