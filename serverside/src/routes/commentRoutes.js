const router = require('express').Router();
const { addComment, getCommentsForPost } = require('../controllers/commentController');
const protect = require('../middleware/auth');

router.post('/', protect, addComment);
router.get('/post/:postId', getCommentsForPost);

module.exports = router;
