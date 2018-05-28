class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    /*=====================================================
    add / remove post
    =======================================================*/
    registerAddPost() {
        $('#addpost').on('click keyup', (event) => {
            console.log('in registerAddPost event:');

            event.preventDefault();
            if (event.keyCode === 13 || event.type === 'click') {
                let $input = $("#postText");
                if ($input.val() === "") {
                    alert("Please enter text!");
                }
                else {
                    this.postsRepository.addPost($input.val()).then(() => {
                        this.postsRenderer.renderPosts(this.postsRepository.posts);
                        $input.val("");
                    }).catch(() => { console.log('catch- error in adding post function'); });
                }
            }
        });
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            console.log('in registerRemovePost event:');

            let index = $(event.currentTarget).closest('.post').index();
            let id = $(event.currentTarget).closest('.post').data('id');
            this.postsRepository.removePost(index, id).then(() => {
                // remove the post from page
                let $post = $(event.currentTarget).closest('.post');
                $post.remove();
            });
        });

    }

    /*=====================================================
    add / remove /show comments
    =======================================================*/
    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            console.log('in registerAddComment event:');

            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');

            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }

            let d = new Date();

            let postIndex = $(event.currentTarget).closest('.post').index();
            let newComment = { text: $comment.val(), createDate: d.getTime(), user: $user.val() };

            console.log(newComment);

            this.postsRepository.addComment(newComment, postIndex).then(() => {
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
                $comment.val("");
                $user.val("");
            }).catch(() => { console.log('catch- error in adding comment function'); });
        });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            console.log('in registerRemoveComment event:');
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            this.postsRepository.deleteComment(postIndex, commentIndex).then(() => {
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            });
        });
    }

    /*=====================================================
    optional
    =======================================================*/

    registerToggleUpdatePost() {
        this.$posts.on('click', '.edit-post-icon', (event) => {
          let $clickedPost = $(event.currentTarget).closest('.post');
          let textPost = $clickedPost.find('.post-text').text();
          $clickedPost.find('.comments-container').removeClass('show');
          $clickedPost.find('.edit-post-form').toggleClass('show');
          $clickedPost.find('#edit-post-input').val(textPost);
        });
      }


      registerUpdatePostText() {
        this.$posts.on('click', '#editPostButton', (event) => {
          let postIndex = $(event.currentTarget).closest('.post').index();
          let $clickedPost = $(event.currentTarget).closest('.post');
          let inputText = $clickedPost.find('#edit-post-input').val();

          if (inputText === '') {
            alert('Please enter text for the post!');
            return;
          } else {
            this.postsRepository.updatePost(postIndex, inputText).then(() => {
              this.postsRenderer.renderPosts(this.postsRepository.posts);
            }).catch(() => { console.log('catch- error in update post-text function');});
          }
        });
      }

      registerCancelUpdates() {
        this.$posts.on('click', '#cancelEditPost, #cancelEditComment', (event) => {
          let $clickedPost = $(event.currentTarget).closest('.post');
          // if update post was canceled
          if ($(event.currentTarget)[0].id == 'cancelEditPost') {
            $clickedPost.find('.edit-post-form').toggleClass('show');
          } else { // if update comment was canceled
            let $clickedComment = $(event.currentTarget).closest('.comment');
            $clickedComment.find('.edit-comment-form').toggleClass('show');
          }
        });
      }
}

export default EventsHandler