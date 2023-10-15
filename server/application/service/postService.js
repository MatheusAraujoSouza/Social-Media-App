import PostMessage from '../../domain/models/postMessages.js';
import AutoMapper from '../../application/automapper/automapper.js'; 

class PostService {
  async getPosts() {
    try {
      const posts = await PostMessage.find();
      return posts.map((post) => AutoMapper.mapToPostDto(post));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPostsById(id) {
    try {
      const post = await PostMessage.findById(id);
      return AutoMapper.mapToPostDto(post);
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
    try{
      const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, _id: id }, { new: true });
      return updatedPost;
    }
    catch(error){
      throw new Error(error.message);
    }
  }

  async deletePost(id) {
    try{
      await PostMessage.findByIdAndRemove(id);
      return { message: 'Post deleted successfully' };
    }catch{
      throw new Error(error.message);
    }
  }

  async likePost(id) {
    try{
      const post = await PostMessage.findById(id);
      const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
      return updatedPost;
    }catch{
      throw new Error(error.message);
    }
  }
}

export default PostService;
