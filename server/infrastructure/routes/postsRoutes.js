import express from "express";
import {getPosts, getPostById as getPostById, createPost, updatePost, deletePost, likePost} from "../../application/controllers/posts.js";


const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/likePost', likePost);

export default router;