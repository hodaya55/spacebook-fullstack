/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    addPost(postText) {
        console.log('in AddPost:');
        return $.ajax({
            method: 'post',
            url: '/posts',
            data: { text: postText, comments: [] },
            //After a new post has been created in the DB it should be returned to the client
            success: (newPost) => {
                console.log("postText: " + postText);
                // adding the post to posts array
                this.posts.push(newPost);
                // this.posts.unshift(newPost);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    removePost(index, id) {
        console.log('in removePost:');
        //delete request to the server
        return $.ajax({
            method: 'DELETE',
            url: '/posts/' + id,
            success: (result) => {
                console.log(result);
                // deleting the post from posts array
                this.posts.splice(index, 1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    addComment(newComment, postIndex) {
        console.log('in addComment');
        var idPost = this.posts[postIndex]._id;
        return $.ajax({
            method: 'POST',
            url: '/posts/' + idPost + '/comments',
            data: newComment,
            //After a new comment has been created in the DB it should be returned to the client
            success: (updatedPost) => {
                console.log("updatedPost: ");
                console.log(updatedPost);
                // adding the comment to posts array
                if (updatedPost.comments.length == 0)
                    this.posts[postIndex].comments.push(updatedPost.comments[0]);

                else
                    this.posts[postIndex].comments.push(updatedPost.comments[updatedPost.comments.length - 1]);
                    // this.posts[postIndex].comments.unshift(updatedPost.comments[updatedPost.comments.length - 1]);
            },
            // success: (newCommentDB) => {
            //     console.log("newCommentDB: ");
            //     console.log(newCommentDB);
            //     // adding the comment to posts array
            //     this.posts[postIndex].comments.push(newCommentDB);
            // },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };


    deleteComment(postIndex, commentIndex) {
        console.log('in deleteComment');

        var idPost = this.posts[postIndex]._id;
        var idComment = this.posts[postIndex].comments[commentIndex]._id;
        //delete request to the server
        return $.ajax({
            method: 'DELETE',
            url: '/posts/' + idPost + '/comments/' + idComment,
            success: (result) => {
                console.log(result);
                //deleting the comment from posts array
                this.posts[postIndex].comments.splice(commentIndex, 1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };

}

export default PostsRepository