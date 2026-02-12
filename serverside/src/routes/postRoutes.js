const router = require("express").Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:slug", postController.getPostBySlug);
router.post("/", auth, postController.createPost);
router.put("/:slug", auth, postController.updatePost);
router.delete("/:slug", auth, postController.deletePost);
router.get("/user/me", auth, postController.getMyPosts);
router.get("/category/:category", postController.getPostsByCategory);

module.exports = router;


