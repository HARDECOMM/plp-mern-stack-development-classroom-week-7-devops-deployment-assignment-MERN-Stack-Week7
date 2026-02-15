const router = require('express').Router();
const {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  getPostsByCategory
} = require('../controllers/postController');
const protect = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);
router.put('/:slug', protect, updatePost);
router.delete('/:slug', protect, deletePost);
router.get('/user/me', protect, getMyPosts);
router.get('/category/:category', getPostsByCategory);

module.exports = router;
