/**
 * @class Responsible for rendering posts and comments in the HTML
 */

const TODAY = new Date(); // today
let date2 = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2);

var daysBetween = function (date1_ms, date2_ms) {
  var one_day = 1000 * 60 * 60 * 24;
  var difference_ms = date2_ms - date1_ms; // Convert both dates to milliseconds
  return Math.round(difference_ms / one_day); // Convert back to days and return
}

class PostsRenderer {
  constructor() {
    this.$posts = $(".posts");
    this.$postTemplate = $('#post-template').html();
    this.$commentTemplate = $('#comment-template').html();
  }

  renderPosts(posts) {
    console.log('in renderPosts');

    this.$posts.empty();
    let template = Handlebars.compile(this.$postTemplate);
    for (let i = 0; i < posts.length; i++) {
      // set the numbers of comments of each post
      posts[i].numOfComments = posts[i].comments.length;
      let newHTML = template(posts[i]);
      //   console.log(newHTML);
      this.$posts.append(newHTML);
      //   this.$posts.prepend(newHTML);
      this.renderComments(posts, i);
    }
  }


  renderComments(posts, postIndex) {
    console.log('in renderComments');

    let post = $(".post")[postIndex];
    let $commentsList = $(post).find('.comments-list');
    $commentsList.empty();
    let template = Handlebars.compile(this.$commentTemplate);
    for (let i = 0; i < posts[postIndex].comments.length; i++) {
      let commentDate = posts[postIndex].comments[i].createDate;
      // calculate the days between date of comment and the date today
      posts[postIndex].comments[i].day = daysBetween(commentDate, date2.getTime());
      // posts[postIndex].comments[i].day = daysBetween(commentDate, TODAY.getTime());
      let newHTML = template(posts[postIndex].comments[i]);
      //   console.log(newHTML);
      $commentsList.append(newHTML);
    }
  }
}

export default PostsRenderer