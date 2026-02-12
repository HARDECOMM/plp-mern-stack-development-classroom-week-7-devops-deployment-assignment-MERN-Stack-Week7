const router = require("express").Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post("/", auth, commentController.addComment);
router.get("/post/:postId", commentController.getCommentsForPost);

module.exports = router;
