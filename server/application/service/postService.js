import PostMessage from '../../domain/models/postMessage.js';
import AutoMapper from '../automapper/automapper'; 

class PostService {
  async getPosts() {
    try {
      const posts = await PostMessage.find();
      return posts.map((post) => AutoMapper.mapToPostDto(post));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPost(post) {
    try {
      const newPost = new PostMessage(post); 
      await newPost.save();
      return AutoMapper.mapToPostDto(newPost);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePost(id, post) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('No post with that id');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, _id: id }, { new: true });
    return updatedPost;
  }

  async deletePost(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('No post with that id');
    }
    await PostMessage.findByIdAndRemove(id);
    return { message: 'Post deleted successfully' };
  }

  async likePost(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('No post with that id');
    }
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    return updatedPost;
  }
}

export default PostService;
