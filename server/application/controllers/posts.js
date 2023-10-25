import container from '../../app.js';
const postService = container.resolve('PostService');


export const getPosts = async (req, res) => {
    try {
        const postMessages = await postService.getPosts();
        res.status(200).json(postMessages);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}


export const getPostById = async (req, res) => {
  try {
      const { id } = req.params;
      const postMessages = await postService.getPostById(id);
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
      const newPost = await postService.createPost(post);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    try {
      const updatedPost = await postService.updatePost(id, post);
      res.json(updatedPost);
    } catch (error) {
      res.status(404).send(error.message);
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await postService.deletePost(id);
      res.json(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedPost = await postService.likePost(id);
      res.json(updatedPost);
    } catch (error) {
      res.status(404).send(error.message);
    }
}