import express from "express";
import {getPosts, getPostsById, createPost, updatePost, deletePost, likePost} from "../../application/controllers/posts.js";
import auth from "../../infrastructure/middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/:id',auth, getPostsById);
router.post('/',auth, createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.put('/:id/likePost',auth, likePost);

export default router;