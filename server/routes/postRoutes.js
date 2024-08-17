const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/middleware');

// Routes
router.post('/create', authMiddleware, postController.createPost);
router.post('/:postId/add-like', authMiddleware, postController.addLikeToPost);
router.post('/:postId/remove-like', authMiddleware, postController.removeLikeFromPost);
router.get('/:postId/comments', authMiddleware, postController.getCommentsOfPost);
router.post('/:postId/add-comment', authMiddleware, postController.addCommentToPost);
router.get('/:postId', authMiddleware, postController.getSinglePostById);
router.get('/', authMiddleware, postController.getPosts);

module.exports = router;
