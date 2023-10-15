import PostMessage from '../../domain/models/postMessages.js';

class AutoMapper {
  static mapToPostDto(post) {
    return {
      id: post._id,
      title: post.title,
      message: post.message,
      creator: post.creator,
      tags: post.tags,
      selectedFile: post.selectedFile,
      likeCount: post.likeCount,
      createdAt: post.createdAt,
    };
  }

  static mapToPostModel(postDto) {
    return new PostMessage({
      title: postDto.title,
      message: postDto.message,
      creator: postDto.creator,
      tags: postDto.tags,
      selectedFile: postDto.selectedFile,
      likeCount: postDto.likeCount,
      createdAt: postDto.createdAt,
    });
  }
}

export default AutoMapper;