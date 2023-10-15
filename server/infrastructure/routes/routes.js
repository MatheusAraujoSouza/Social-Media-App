import express from "express";
import {getPosts, getPostsById, createPost, updatePost, deletePost, likePost} from "../../application/controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostsById);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id', likePost);

export default router;