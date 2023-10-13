import express from "express";
import {getPosts, createPost, updatePost, deletePost, likePost} from "../../application/controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.likePost('/:id', likePost);

export default router;