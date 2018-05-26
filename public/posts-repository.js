/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }

    addPost(postText) {
        console.log('in AddPost:');

        // is it ok to do this? because it doesnt recognise "this.posts or posts"
        var postArray = this.posts;
        // this.posts.push({ text: postText, comments: [] });

        //After a new post has been created in the DB it should be returned to the client
        //where (in the AJAX success handler) you can push it to the posts array and render the posts.
        $.ajax({
            method: 'post',
            url: '/posts',
            data: { text: postText, comments: [] },
            success: function (newPost) {
                console.log("postText: " + postText);
                postArray.push(newPost);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }

    removePost(index) {
        console.log('in removePost:');

        this.posts.splice(index, 1);

        var id = '????';

        //writing an delete request to that route - but you'll need to somehow include the post's ID as part of the requested route.
        $.ajax({
            method: 'DELETE',
            url: '/delete:' + id,
            // data: ,
            // dataType: '',
            success: function (data) {
                console.log(data);
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