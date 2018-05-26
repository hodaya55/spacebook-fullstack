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

//request the new server route (/posts).
//in the success handler- populate the posts array and then use it to render the view
//invoke the client-side function when the app loads
var getPosts = function () {
  $.ajax({
    method: 'get',
    url: '/posts',
    // data: postsRepository.posts,
    dataType: 'json',
    success: function (posts) {
      console.log('in success ajax:');
      console.log(posts);

      postsRepository.posts = posts;
      postsRenderer.renderPosts(postsRepository.posts);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
}

getPosts();