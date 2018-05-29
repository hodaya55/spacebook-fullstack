import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();

eventsHandler.registerToggleUpdatePost();
// eventsHandler.registerToggleUpdateComment();
eventsHandler.registerCancelUpdates();
eventsHandler.registerUpdatePostText();
// eventsHandler.registerUpdateCommentText();

//request all the posts from the DB
//in the success handler- populate the posts array and then use it to render the view
var getPosts = function () {
  $.ajax({
    method: 'get',
    url: '/posts',
    dataType: 'json',
    success: function (posts) {
      console.log('in getPosts, posts-array:');
      console.log(posts);
      // add the posts and the comments to array
      postsRepository.posts = posts;
      // render all posts and comments on the page
      postsRenderer.renderPosts(postsRepository.posts);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
}

//invoke this client-side function when the app loads
//in order to display all posts as soon as page loads
getPosts();