/**
 * @class Responsible for rendering posts and comments in the HTML
 */


var daysBetween = function (date1_ms, date2_ms) {   //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
  var difference_ms = date2_ms - date1_ms; // Convert back to days and return
  return Math.round(difference_ms / one_day);
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
      let d = new Date(); // today
      let commentDate = posts[postIndex].comments[i].createDate;
      let date2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() +2);
      // var dayDifference = daysBetween(commentDate, d.getTime());
      // posts[postIndex].comments[i].day = dayDifference;
      // calculate the days between date of comment and the date today
      posts[postIndex].comments[i].day = daysBetween(commentDate, date2.getTime());

      let newHTML = template(posts[postIndex].comments[i]);
      //   console.log(newHTML);
      $commentsList.append(newHTML);
    }
  }
}

export default PostsRenderer