/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    addPost(postText) {
        console.log('in AddPost:');
        //After a new post has been created in the DB it should be returned to the client
        //where (in the AJAX success handler) you can push it to the posts array and render the posts.
        $.ajax({
            method: 'post',
            url: '/posts',
            data: { text: postText, comments: [] },
            success: (newPost) => {
                console.log("postText: " + postText);
                this.posts.push(newPost);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    // removePost(index) {
    removePost(index, id) {
        console.log('in removePost:');
        console.log("id: " + id);
        //delete request to that route
        $.ajax({
            method: 'DELETE',
            url: '/posts/' + id,
            success: (result)=> {
                console.log(result);
                if (result == 'remove successfully')
                    this.posts.splice(index, 1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
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