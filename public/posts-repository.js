    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    addPost(postText) {
        console.log('in AddPost');

        this.posts.push({ text: postText, comments: [] });
    }

    removePost(index) {
        console.log('in removePost');

        this.posts.splice(index, 1);
    }

    addComment(newComment, postIndex) {
        console.log('in addComment');

        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        console.log('in deleteComment');

        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository